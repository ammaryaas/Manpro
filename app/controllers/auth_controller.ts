import User from '#models/user'
import { loginValidator, registerValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'

export default class AuthController {
    async show({ view }: HttpContext) {
        return view.render('login')
    }

    async login({ request, auth, response, session }: HttpContext) {
        try {
            const { email, password } = await request.validateUsing(loginValidator)
            const user = await User.findBy('email', email)
            if (!user) {
                session.flash('error', 'Wrong password or email!')
                return response.redirect().back()
            }
            const isPasswordValid = await hash.verify(user.password, password)
            if (!isPasswordValid) {
                session.flash('error', 'Wrong password or email!')
                return response.redirect().back()
            }
            await auth.use('web').login(user)
            return response.redirect().toRoute('admin.dashboard')
        } catch (error) {
            session.flash('error', 'Wrong password or email!')
            return response.redirect().back()
        }
    }

    async register({ request, auth, response, session }: HttpContext) {
        try {
            const data = await request.validateUsing(registerValidator)
            const existingUser = await User.findBy('email', data.email)
            if (existingUser) {
                session.flash('error', 'Email sudah terdaftar!')
                return response.redirect().back()
            }
            const user = await User.create({
                fullName: data.fullName,
                email: data.email,
                password: data.password
            })
            await auth.use('web').login(user)
            session.flash('success', 'Registrasi berhasil!')
            return response.redirect().toRoute('dashboard')
        } catch (error) {
            session.flash('error', 'Terjadi kesalahan saat registrasi!')
            return response.redirect().back()
        }
    }

    async logout({ auth, response, session }: HttpContext) {
        await auth.use('web').logout()
        session.flash('success', 'Logout berhasil!')
        return response.redirect().toRoute('home')
    }
} 
