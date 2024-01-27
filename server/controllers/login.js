const { OAuth2Client } = require("google-auth-library");
const dotenv = require("dotenv");
dotenv.config();
const findUser = require("../global/findUser");
const Hospital = require("../models/hospital");
const BloodBank = require("../models/bloodBank");
const User = require("../models/users");

const handleLoginRequest = async (req, res) => {
  try {
    const redirectUrl = process.env.SERVER_URL + "/api/callback";
    const oAuth2Client = new OAuth2Client(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      redirectUrl
    );

    const refreshToken = req.cookies?.RSrefreshToken;

    if (refreshToken) {
      const accessToken = await handleRefreshLogin(refreshToken);
      const redirectURL = `${process.env.CLIENT_URL}/redirection/${accessToken}`;
      return res.redirect(redirectURL);
    }

    const authUrlOptions = {
      access_type: "offline",
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
      ],
      prompt: "consent",
    };

    const authorizeUrl = oAuth2Client.generateAuthUrl(authUrlOptions);
    return res.redirect(authorizeUrl);
  } catch (error) {
    console.error("Error in handling login request:", error);
    return res.status(500).send("Internal Server Error");
  }
};

const callbackCheck = async (req, res) => {
  const code = req.query.code;

  try {
    const redirectUrl = process.env.SERVER_URL + "/api/callback";
    const oAuth2Client = new OAuth2Client(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      redirectUrl
    );

    // Exchange the authorization code for tokens
    const tokenResponse = await oAuth2Client.getToken(code);
    const userCredentials = tokenResponse.tokens;

    // Set user credentials in OAuth2 client
    oAuth2Client.setCredentials(userCredentials);

    // Access token
    const accessToken = userCredentials.id_token;
    // Refresh Token
    const refreshToken = userCredentials.refresh_token;

    console.log(accessToken);

    // Verify the ID token
    const ticket = await oAuth2Client.verifyIdToken({
      idToken: accessToken,
      audience: process.env.CLIENT_ID,
    });
    const payload = ticket.getPayload();

    console.log(payload);

    const sub_id = payload["sub"];
    const name = payload["name"];
    const email = payload["email"];
    const picture = payload["picture"];
    console.log(name);
    const user = await findUser(email);

    if (!user) {
      const userInfo = {
        sub_id: sub_id,
        name: name,
        email: email,
        profilePicture: picture,
      };
      const encodedUserInfo = encodeURIComponent(JSON.stringify(userInfo));
      const redirectURL =
        process.env.CLIENT_URL + `/new-profile?userInfo=${encodedUserInfo}`;
      return res.redirect(redirectURL);
    } else {
      var updatedUser = await User.findOneAndUpdate(
        { email },
        {
          $set: {
            sub_id: sub_id,
            profilePicture: picture,
            name: name,
          },
        },
        { new: true }
      );
      if (!updatedUser) {
        updatedUser = await Hospital.findOneAndUpdate(
          { email },
          {
            $set: {
              sub_id: sub_id,
              profilePicture: picture,
            },
          },
          { new: true }
        );
      }
      if (!updatedUser) {
        updatedUser = await BloodBank.findOneAndUpdate(
          { email },
          {
            $set: {
              sub_id: sub_id,
              profilePicture: picture,
            },
          },
          { new: true }
        );
      }
    }

    res.cookie("refreshToken", refreshToken, {
      path: "/",
      maxAge: 60 * 60 * 24 * 1000,
      httpOnly: true,
      secure: false,
      overwrite: true,
    });

    return res.redirect(`${process.env.CLIENT_URL}/redirection/${accessToken}`);
  } catch (err) {
    console.error("Error in callback check:", err);
    res.status(500).send("Error during authentication");
  }
};

const getUserWithAccessToken = async (req, res) => {
  try {
    const accessToken = req.body.accessToken;
    const redirectUrl = process.env.SERVER_URL + "/api/callback";
    const oAuth2Client = new OAuth2Client(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      redirectUrl
    );
    const ticket = await oAuth2Client.verifyIdToken({
      idToken: accessToken,
      audience: process.env.CLIENT_ID,
    });
    const payload = ticket.getPayload();
    // console.log(payload);

    const currentTimestamp = Date.now();
    const givenTimestampInSeconds = payload.exp;
    const givenTimestampInMilliseconds = givenTimestampInSeconds * 1000;

    if (currentTimestamp > givenTimestampInMilliseconds) {
      return res
        .status(500)
        .json({ success: false, msg: "Your Session Has Expired" });
    }

    const sub_id = payload["sub"];
    const email = payload["email"];
    const user = await findUser(email);

    if (!user) {
      console.log("User Does not exist");
      return res
        .status(200)
        .json({ success: false, msg: `User Doesn't Exist` });
    }

    // const flag = user._doc.isActive;
    // if (!flag){
    //     return res.status(500).json({ success: false, msg: "Account is Deactivated" });
    // }

    return res.status(200).json({ success: true, msg: user });
  } catch (error) {
    console.log(`${error.message} (error)`.red);
    return res.status(500).json({ success: false, msg: error.message });
  }
};

const registerUser = async (req, res) => {
  try {
    var data = req.body;
    console.log(data);
    const user = new User(data);
    await user.save();
    return res
      .status(200)
      .json({ success: true, msg: "Request Posted SuccessFully" });
  } catch (error) {
    console.log(`${error.message} (error)`.red);
    return res.status(400).json({ success: false, msg: error.message });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.cookie("RSrefreshToken", "", {
      path: "/",
      maxAge: 0,
      httpOnly: true,
      secure: false,
      overwrite: true,
    });
    res.redirect(process.env.CLIENT_URL + "/login");
  } catch (error) {
    console.log(`${error.message} (error)`.red);
    return res.status(500).json({ success: false, msg: error.message });
  }
};

module.exports = {
  handleLoginRequest,
  callbackCheck,
  getUserWithAccessToken,
  registerUser,
  logoutUser,
};
