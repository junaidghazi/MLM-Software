const userModel = require("../models/user");

exports.getDashboard = async (req, res) => {
  try {
    let user = await userModel.findById(req.user.userid);
    if (!user) return res.status(404).send("User not found");

    const loginDate = user.loginDate;
    const formattedDate = loginDate.toLocaleDateString("en-GB").replace(/\//g, "/");
    const formattedTime = loginDate.toLocaleTimeString("en-GB");
    const formattedLoginDate = `${formattedDate} ${formattedTime}`;

    const userData = {
      name: user.name,
      id: user._id,
      mobile: user.mobileNumber,
      address: user.address,
      currentLevel: user.level,
      loginDate: formattedLoginDate,
      totalTeamMembers: user.totalTeamMembers || 0,
      totalDirectTeam: user.totalDirectTeam || 0,
      selfBusiness: user.selfBusiness || 0,
      teamBusiness: user.teamBusiness || 0,
      totalBusiness: user.totalBusiness || 0,
      sponsors: user.sponsors.map((sponsor) => ({
        name: sponsor.name,
        associateId: sponsor.associateId,
        sponsorId: sponsor.sponsorId,
        doj: sponsor.doj,
      })),
      notice: user.notice || "Notice text goes here.",
    };

    res.render("dashboard", { user: userData });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).send("Internal Server Error");
  }
};


