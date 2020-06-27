const VerificaUsuarioLogado = (req,res,next) => {

    // Se a session o usuário não estiver setada, redireciona para login
    if(!req.session.usuario) {
        res.redirect('/login?error=2')
    }

    // Se chegou até aqui, a session está ok
    next();
}

module.exports = VerificaUsuarioLogado;