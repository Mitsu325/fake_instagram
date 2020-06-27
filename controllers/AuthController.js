const { Usuario, Post, Comentario } = require('../models');
const bcrypt = require('bcrypt');

const AuthController = {
    
    showLogin: (req,res) => {
        res.render('auth/login');
    },

    showRegistro: (req,res) => {
        res.render('auth/register');
    },

    showHome: async (req,res) => {
        let posts = await Post.findAll({
            include:[
                {
                    model: Comentario,
                    as: 'comentarios',
                    include: 'usuario'
                }, 
                'usuario'
            ]
        })
        res.render('index', {posts});
    },

    login: async (req,res) => {
        
        // Lendo as info do body
        const { email, senha } = req.body;

        // Tentar carregar um usuário
        const user = await Usuario.findOne({ where: { email } });

        // Verificar se existe um usuário com o email
        if (!user) {
            res.redirect('/login?error=1');
        }

        // Validar a senha passada via post contra a guardada no banco
        if (!bcrypt.compareSync(senha, user.senha)) {
            res.redirect('/login?error=1');
        }

        // Setar uma session com o usuário
        req.session.usuario = user;

        // Redirecionar o usuário para a rota '/home'
        res.redirect('/home');
    }

}

module.exports = AuthController;