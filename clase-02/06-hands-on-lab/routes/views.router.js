import { Router } from 'express'

const router = Router()

function isLoggedIn(req, res, next) {
  if (!req.session.user) return res.redirect('/')
  next()
}

function isNotLoggedIn(req, res, next) {
  if (req.session.user) return res.redirect('/profile')
  next()
}

router.get('/', isNotLoggedIn, (req, res) => {
  res.render('login')
})

router.get('/register', isNotLoggedIn, (req, res) => {
  res.render('register')
})

router.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile', { user: req.session.user })
})

export default router
