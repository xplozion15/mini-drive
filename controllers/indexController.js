function showIndexPage(req, res) {
  res.render("index");
}

function showLoginPage(req, res) {
  res.render("loginPage");
}

function showPrivacyPage(req,res) {
  res.render("terms");

}

function showTermsPage(req,res) {
  res.render("privacyPolicy");
}


module.exports = { showIndexPage, showLoginPage ,showTermsPage,showPrivacyPage};
