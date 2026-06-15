window.cryptoSettings = {
    iterations: 150000,
};

window.analyticsUsers = [
    {
        user: 'admin',
        name: 'Administrador',
        passwordVerifier: {
            salt: 'SJwWrPoMQXvH657Eju0OkQ==',
            hash: '5ubtMQTv0E4p28nhOdB6kvFtxZGxdzQLVwYium1OHpY=',
        },
        permissions: {
            modules: ['*'],
            homeSections: ['*'],
            dashboardSections: ['*'],
            informeColegios: ['*'],
            encuestaJuvenil: ['*'],
        },
    },
    {
        user: 'Colegio01',
        name: 'Colegio 01',
        passwordVerifier: {
            salt: 'eUzLhrSZF6Ok61sNapPPxA==',
            hash: 'b0ZXdQXCmgQgEv0qt6yfA/f7lCzgOHNpdT0Yr52DqBQ=',
        },
        permissions: {
            modules: ['procesos', 'evaluacion', 'datos'],
            homeSections: [],
            dashboardSections: ['*'],
            informeColegios: ['colegio-01'],
            encuestaJuvenil: ['jovenes-colegios'],
        },
    },
    {
        user: 'pastoral01',
        name: 'Pastoral 01',
        passwordVerifier: {
            salt: 'WSl6IQKYvt+FqJfsxkYlxQ==',
            hash: 'NWT08UE7a+QR8aLW9vgBbF1OtxAZlaT2jKaYHOQKOR0=',
        },
        permissions: {
            modules: ['*'],
            homeSections: ['equipo-pj', 'pepsi', 'calendarios'],
            dashboardSections: ['informeColegios'],
            informeColegios: ['*'],
            encuestaJuvenil: [],
        },
    },
];
