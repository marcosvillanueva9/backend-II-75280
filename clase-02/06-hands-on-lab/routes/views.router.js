import { Router } from "express";

const router = Router();

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
});

router.get('/register', isNotLoggedIn, (req, res) => {
  res.render('register')
});

router.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile', {
    user: req.session.user
  });
});

router.get('/productos', isLoggedIn, (req, res) => {
  res.render('productos', {
    user: req.session.user,
    productos: [
    { nombre: 'Producto 1', precio: 1500 },
    { nombre: 'Producto 2', precio: 2300 },
    { nombre: 'Producto 3', precio: 999 }
  ]
  });
});

export default router;