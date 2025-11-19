function showIndexPage(req, res) {
  res.render("index");
}

function showPrivacyPage(req, res) {
  res.render("terms");
}

function showTermsPage(req, res) {
  res.render("privacyPolicy");
}

module.exports = { showIndexPage, showTermsPage, showPrivacyPage };
