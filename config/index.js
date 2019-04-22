module.exports = {
    envCheck: () => {
        const arr = ['PORT', 'DB_HOST', 'NODE_ENV'];
        const missing = [];
        const check = arr.every(e => {
            if (!!process.env[e]) return true;
            else {
                missing.push(e);
                return false;
            }
        })
        if (check) {

        } else {
            console.error({ message: 'CHECK ENV VARIABLES', missing })
            process.exit(1)
        }
    },
    passport: {
        secret: 'TX5D3UamrcZNFunq'
    },
    crypto: {
        algorithm: 'aes-256-ctr',
        password: 'd6F3Efeq'
    },
    extensions: [
        '.pdf', '.doc', '.docx', '.ppt', '.pptx'
    ]
}