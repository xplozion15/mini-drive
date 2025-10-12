

function showIndexPage(req,res) {
    res.render("index");

}

function showLoginPage(req,res) {
    res.render("loginPage")
}


module.exports = {showIndexPage,showLoginPage};