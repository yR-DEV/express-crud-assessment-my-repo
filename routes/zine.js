var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/magazineArticles');
var articleCollection = db.get('articles');

/* getting home index of zine routes */
router.get('/zine', function(req, res, next) {
  articleCollection.find({}, function(err, articles) {
    res.render('zine/index', {allArticles: articles});
  });
});

router.get('/zine/newArticle', function(req, res, next) {
  res.render('zine/newArticle');
});

router.get('/zine/showArticles', function(req, res, next) {
  articleCollection.find({}, function(err, articles) {
    res.render('zine/showArticles', {allArticles: articles});
  })
});

router.post('/zine/showArticles', function(req, res,next) {
var theCheckBox = req.body.backgroundDarkColorsBox;
if(theCheckBox === 'on') {
  theCheckBox = "yes";
} else {
  theCheckBox = "no";
}

  articleCollection.insert({ title: req.body.articleTitleInput,
                             backgroundURL: req.body.backgroundImgUrlInput,
                             hasDarkColors: theCheckBox,
                             excerpt: req.body.articleExcerptTextArea,
                             body: req.body.articleBodyTextArea});
  res.redirect('/zine/showArticles');
});

router.get('/zine/showSingleArticle', function(req, res, next) {
  res.render('zine/showSingleArticle');
})

router.get('/zine/:id', function(req, res, next) {
  articleCollection.findOne({_id: req.params.id}, function(err, theArticle) {
    res.render('zine/showSingleArticle', {article: theArticle});
  });
});

router.get('/zine/:id/editArticle', function(req, res, next) {
  articleCollection.findOne({_id: req.params.id}, function(err, theArticle) {
    res.render('zine/editArticle', {article: theArticle});
  });
});

router.post('/zine/:id/updateArticle', function(req, res, next) {
  var theCheckBox = req.body.backgroundDarkColorsBox;
  if(theCheckBox === 'on') {
    theCheckBox = "yes";
  } else {
    theCheckBox = "no";
  }

  articleCollection.update({_id: req.params.id},
                            { $set:
                               {title: req.body.articleTitleInput,
                               backgroundURL: req.body.backgroundImgUrlInput,
                               hasDarkColors: theCheckBox,
                               excerpt: req.body.articleExcerptTextArea,
                               body: req.body.articleBodyTextArea}
                             });
  res.redirect('/zine/' + req.params.id);
});

module.exports = router;
