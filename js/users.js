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
            analyticsGroups: ['*'],
            redEscuelas: ['*'],
            inscripcionPastoral: ['*'],
            encuestaJuvenilCategories: ['*'],
            jovenesColegios: ['*'],
            apoderadosColegios: ['*'],
            educadoresPersonal: ['*'],
            parroquiasSantuarios: ['*'],
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
            analyticsGroups: ['redEscuelas', 'inscripcionPastoral', 'encuestaJuvenil'],
            redEscuelas: ['colegio-01'],
            inscripcionPastoral: ['colegio-01'],
            encuestaJuvenilCategories: ['jovenesColegios', 'apoderadosColegios', 'educadoresPersonal', 'parroquiasSantuarios'],
            jovenesColegios: ['colegio-01'],
            apoderadosColegios: ['colegio-01'],
            educadoresPersonal: ['colegio-01'],
            parroquiasSantuarios: ['total'],
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
            analyticsGroups: ['redEscuelas', 'inscripcionPastoral'],
            redEscuelas: ['*'],
            inscripcionPastoral: ['*'],
            encuestaJuvenilCategories: [],
            jovenesColegios: [],
            apoderadosColegios: [],
            educadoresPersonal: [],
            parroquiasSantuarios: [],
        },
    },
];
