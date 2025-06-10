import { Router } from 'express'

const router = Router()

const users = []

router.post('/register', (req, res) => {
  const { first_name, last_name, email, age, password } = req.body
  users.push({ first_name, last_name, email, age, password })
  res.redirect('/')
})

router.post('/login', (req, res) => {
  const { email, password } = req.body
  const user = users.find(u => u.email === email && u.password === password)

  if (!user) return res.status(401).send('Credenciales inválidas')

  req.session.user = {
    name: user.first_name,
    email: user.email
  }

  res.redirect('/profile')
})

router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).send('Error al cerrar sesión')
    res.redirect('/')
  })
})

export default router
