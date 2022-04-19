
const Admin = require("../models/Admin");
// const { sendConfirmationEmail } = require('./ConfirmationControllers')
const Verification = require("../models/AdminVerification");

exports.Login = async (req, res) => {
  try {
    const { email, pass } = req.body;

    if (!email || !pass) return res.send({ success: false, errorId: 1 });

    // if (!email && !username) //send success false
    // if (!pass) send success false
    // const user = User.findOne({email: email, pass: pass})
    let user = await Admin.findOne({ email }).select("-__v");

    console.log("Login: admin is", user);
    if (!user) return res.send({ success: false, errorId: 2 });

    const passMatch = await user.comparePassword(pass, user.pass);

    if (!passMatch) return res.send({ success: false, errorId: 3 }); // passwords don't match

    const adminWithToken = await user.generateToken();
    console.log("Admin with Token", adminWithToken);

    user = user.toObject();
    delete user.pass;
    delete user.token;

    // const token = await user.generateToken('1d');
    res
      .cookie("cookiename", adminWithToken.token)
      .send({ success: true, user });

    // user = user.toObject();
    // delete user.pass;
    // delete user.token;
    // res.cookie('cookiename', token).send({success: true, user})
    // const updatedAdmin= user.toObject()
    // delete updatedAdmin.pass
    // delete updatedAdmin.token
    // res.cookie('cookiename', token).send({success: true, user: {...updatedAdmin}})
  } catch (error) {
    console.log("Login ERROR:", error.message);
    res.send(error.message);
  }
};

exports.Register = async (req, res) => {
  try {
    console.log("req.body is", req.body);
    const user = new Admin(req.body);

    await user.save();

    res.send({ success: true });
  } catch (error) {
    console.log("Register Error: ", error.message);
  }
};

// exports.Activate = async (req, res) => {
//     try {
//         const newAdmin = new PendingAdmin({email,username,password});
//         await newAdmin.hashPassword();
//         await newAdmin.save();
//         await sendConfirmationEmail({toAdmin: newAdmin.data, hash: newAdmin.data_id});
//         res.send('You have been registered.Check your email')

//     } catch (error) {
//         res.status(422).send(error.message)
//     }
// }

exports.Verification = async (req, res) => {
  const saltRounds = 10;
  const hashedPassword = hash(password, saltRounds);

  try {
    const newAdmin = new PendingAdmin({
      email,
      username,
      password: hashedPassword,
      verified: false,
    });
    await newAdmin.hashedPassword();
    await newAdmin.save();
    await sendVerificationEmail({
      toAdmin: newAdmin.data,
      hash: newAdmin.data_id,
    });
    res.send("You have been registered.Check your email");
  } catch (error) {
    res.status(422).send(error.message);
  }
};

// exports.changePassword = async (req, res) => {
//   console.log("Change Password");
//   try {
//     const { adminId } = req.params;
//     const salt = await bcrypt.genSalt(10);
//     const password = await bcrypt.hash(req.body.password, salt);
//     const adminPassword = await Admin.findByIdAndUpdate(
//       { _id: adminId },
//       { password: password },
//       { new: true }
//     );

//     return res.status(200).json({ status: true, data: adminPassword });
//   } catch (error) {
//     return res.status(400).json({ status: false, error: "Error Occured" });
//   }
// };

exports.changePassword = async (req, res) => {
  console.log("Change Password");
  try {
    const { pass, token } = req.body;
    console.log("body is", req.body);
    // 1. verify the token  
    const verifiedToken = await Admin.getPayload(token) 
    console.log("verified token is", verifiedToken);
    const user = await Admin.findByIdAndUpdate(verifiedToken.id);
    if (user) {
      user.pass = pass;
      user.resetToken = "";
      const userSaved = await user.save();
      console.log("user is ", userSaved);
    }

    res.send({ success: true });
  } catch (error) {
    console.log("change pass ERROR:", error.message);
    res.send(error.message);
  }
}; 

exports.logout = async (req, res) => {
  try {
    res.clearCookie("cookiename").send({ success: true });
    console.log("logout: user logged out");
  } catch (error) {
    console.log("Logout ERROR:", error.message);
    res.send(error.message);
  }
};

exports.Profile = async (req, res) => {
  try {
    console.log("req.body is", req.body);
    console.log("req.file is", req.file);

    const { email, username, _id } = req.body;

    if (!(email || username)) return res.send({ success: false, errorId: 1 });

    // const foundUser = await User.findById({_id})
    //
    // update users (field1, field2) set field1 = email and field2 = username

    req.body.image = "/uploads/" + req.file.filename;

    const user = await Admin.findByIdAndUpdate(_id, req.body, {
      new: true,
    }).select("-__v -pass");

    console.log("Profile: user is", user);

    if (!user) return res.send({ success: false, errorId: 2 });

    res.send({ success: true, user });
  } catch (error) {
    console.log("Register ERROR:", error.message);
    res.send(error.message);
  }
};
