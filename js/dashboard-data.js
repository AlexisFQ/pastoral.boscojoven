const schoolItems = [
    { id: 'total', label: 'Total' },
    { id: 'colegio-01', label: 'La Serena' },
    { id: 'colegio-02', label: 'Catemu' },
    { id: 'colegio-03', label: 'Valparaíso' },
    { id: 'colegio-04', label: 'Talca' },
    { id: 'colegio-05', label: 'Linares' },
    { id: 'colegio-06', label: 'Valdivia' },
    { id: 'colegio-07', label: 'Puerto Montt' },
    { id: 'colegio-08', label: 'Puerto Natales' },
    { id: 'colegio-09', label: 'Instituto Don Bosco' },
    { id: 'colegio-10', label: 'Salesianos Alameda' },
    { id: 'colegio-11', label: 'Oratorio Don Bosco' },
    { id: 'colegio-12', label: 'Camilo Ortúzar Montt' },
    { id: 'colegio-13', label: 'Domingo Savio San Ramón' },
    { id: 'colegio-14', label: 'Alto Hospicio' },
    { id: 'colegio-15', label: 'Iquique' },
    { id: 'colegio-16', label: 'Antofagasta' },
    { id: 'colegio-17', label: 'Copiapó' },
    { id: 'colegio-18', label: 'Concepción' },
    { id: 'colegio-19', label: 'Calama' },
    { id: 'colegio-20', label: 'Liceo San José' },
    { id: 'colegio-21', label: 'El Patrocinio de San José' },
    { id: 'colegio-22', label: 'Manuel Arriarán Barros' },
];

window.analyticsDashboards = {
    redEscuelas: {
        label: 'Red Escuelas',
        description: 'Paneles de Red Escuelas por total inspectorial y colegio.',
        selectorLabel: 'Buscar colegio',
        items: schoolItems.map((item) => ({
            ...item,
            dashboard: (() => {
                if (item.id === 'total') {
                    return {
                    title: 'Red Escuelas - Total',
                    encryptedUrls: {
                        admin: {
                            salt: 'SKKX57nGroDSbpCLRpXjWg==',
                            iv: '9HHVXxdeeZnQQ2uM3jBDPg==',
                            data: 'ItvZ/kJNo/ckxfKj38mbEyNUsnRmNgcgYwk+LLt3aMyP1iE0I+Xve5SoIWr+YBIgj3GEww8Urc8fz6yT95o6rT2bDpjV4pOFGYV4CGN8xqwTMHdDLMLaBWwX5tVBEsjOprIQRL1YsGBnaNKi7wmychq4ssoWRYoM2TEfoqgTbd3jPkgr2j2u+NONbZD4pkWaWtzfybxcftsasSa9K9pMpA==',
                        },
                        pastoral01: {
                            salt: '9iKtRhbxURBPg/EaEYbOLw==',
                            iv: 'ToVMKl9ZQ1LxpFXtsE25fg==',
                            data: 'UnkSWInpfGZ+NRTngU8oU1STE+x0XIbQ6xvvM3UXPtcq4i/FkOs69zeqUqoNXimm4sxSIHvyFEuZvlWKfN7/nBml28Z2PyeA8b8207Urs0lnvr8JaANdrq+25K2HlVWreoaRFOnV39g3WrE2pk8gR3HYWgY0odlTZRiTiKhBptusoOkGcEFC+rbeN2XAyvv3yA9Vt71Vixn9BWcmMrPCOg==',
                        },
                    },
                    };
                }

                if (item.id === 'colegio-01') {
                    return {
                        title: 'Red Escuelas - La Serena',
                        encryptedUrls: {
                            admin: {
                                salt: 'HBuZ3e9PzQIVWOKJ/sFllQ==',
                                iv: 'wwmJIzg5soeMl78UGuHJTg==',
                                data: 'BI/81xdp9+xNH4ramEQQ0G/OWhxvICXm2Vcd4E4WyjKOQaxfETyIQ7gbNUP2TeOtx7sp/EKfWIodnYO48Q0/OZv+Gtdo5fM97AszfK0OSyQi/4rCKcmT2hb22FamjnmHZGRvIhQIZMM8YhMgL9Ryg9VWdSqgOOievKU8IOZyzGMSkUW8dt46Y6ovir2Wph+QL+9tQaSWWbbONrUNWwsD+A==',
                            },
                            Colegio01: {
                                salt: 'AzVhw5B5FH4+4EMEEcc5xw==',
                                iv: 'rr/3Nhsnhv8Q/6GAb7ZbXA==',
                                data: 's/wttwdJj2+FEloE02fSt4ZFY2symjOfFbLe25cWOnb83nTN0BFmYqGCkduQotpBj8Skwe5KilTcx8vl1su6I1EvVK3RaywWe832I97CldWS2SjMrukqNZgr9Nhi9pDNiIvfA7CfiC8B+ddTFBJQOPYeUhseYqWcLn1S2V/txDnV5anPdbqQJpKb4TZlZ9rH4gzi45oHERhTWM71YmHYOQ==',
                            },
                            pastoral01: {
                                salt: 'z8VwnslTDhXtfrN5IA9b5A==',
                                iv: '/fxEufXtTQhwpWg8IJP3WQ==',
                                data: 'irR08N6cs+4E4NOwZI+ulgaoAUIuzsRM2MjcuaDkX0zv/23CO8TA/oK4nWgQ3TUfhuORKJepP8FdiuNMKUkY5ft6iAXobQXZfKnAHEtFsAbhrdiswqJ2fIo4bWBSt3JNqFLwb6x3aEIqHfLlqU95Mhsj9Xv6JWZoAvhPXyl82tG8JcGHbTfUpMpndUifyJWqkHThjFKGCLk2I0WEQzBhbA==',
                            },
                        },
                    };
                }

                return { title: `Red Escuelas - ${item.label}` };
            })(),
        })),
    },
    inscripcionPastoral: {
        label: 'Inscripci\u00f3n Pastoral',
        description: 'Paneles de Inscripci\u00f3n Pastoral por total inspectorial y colegio.',
        selectorLabel: 'Buscar colegio',
        items: schoolItems.map((item) => ({
            ...item,
            dashboard: (() => {
                if (item.id === 'total') {
                    return {
                    title: 'Inscripci\u00f3n Pastoral - Total',
                    encryptedUrls: {
                        admin: {
                            salt: '0STYwni6Tr5d0Yq7WRFkxQ==',
                            iv: 'HfJ0fOj8/FDPOrBRL6hZiQ==',
                            data: 'IaBuamIGOMwJndd97TIf6Z8CBypPAICg78Bsag1iQd1ym7UbUSTpx34FG/IKj0+d0Rgky5zVCx4efzuJ6sFxXAcrhqBft+UcEeQt44mwPULlBSYPOmbbvKQ2Tutr5C48ugWtq1Z/Oo4jth4z8Bom7H6ypZnT9N3+pI9I+MEbIBw6xYp/HgdFVhNky1aAMbJJuVw2RW/eXQ4YeM+YBZO92g==',
                        },
                        pastoral01: {
                            salt: 'lQdg6bglcflLebOuC4N8Xw==',
                            iv: 'l9YmF/IUPSYC5Zf+S6RooA==',
                            data: 'Ln2jcdKNB/Erk21VbQm67swqWkl3+rNbkLO5lUpuH0qGwiRypwaHD+gJ7kSYAPeNex7LFpwAwjBsKi8VQq5ePAzO4ky26/GbSJApwTZ7AmsMh6DLG8moWzT9zR4+WJi85SsVyzvgJ7U60wDT+RaHq5oNF4bYbSWnaVPMXYvf9R0zGVO5cVKt4LNqQYab6cWSbt0O/oyvsqk1ZZ62Ncss1g==',
                        },
                    },
                    };
                }

                if (item.id === 'colegio-01') {
                    return {
                        title: 'Inscripci\u00f3n Pastoral - La Serena',
                        encryptedUrls: {
                            admin: {
                                salt: '3fnYjf2I7qOFFDcAWV1A2Q==',
                                iv: 'j6gGdzxTu+AAsW/d6KD1bA==',
                                data: 'ssykHTvc6RETzXVeiP0twFMRugbsZimfJUWRe8hGhWT3mx03bRBegPMFPnRsMg+q97GzJWaiuxf5dsKcE5UAE/XKlCC4gjv/tG94y6jVVC1lI9XSBMxZQtfR0u3PvTb7h70tZmGjPlrZU3esUGXfk/+sYAMgtrd87gQDuVvO3tr6hF58zFCRN+9ebbN8aK7jjP38MNoHrGm88sCj2vMEWA==',
                            },
                            Colegio01: {
                                salt: 'ORK8ivE+42Ihn9DbbiBs9Q==',
                                iv: 'pIHBHt+1RYP0fpyxTLgJKg==',
                                data: 'cg+wYvnYXlEnl0CxPYRBduto5UHRunupAGb2DU+D4mW5qjPJnhXE0bV1TWu9IlgHMBp5Jj+ZE+c2PNbtUaQsWsNpMyXvMgLumzmH8PpJdJRCjvpdz4JhfiSNKdHsQOJyNIGWHvIsu9WcGlTARxQfdHrtVv0hzzbXFPLFn9HxPSlcSSawmkxjiIpCrd+dx/gTTWuASgW1y2xf0Tw0jWg/Ew==',
                            },
                            pastoral01: {
                                salt: 'SHUbhihg7wx1bRG/pVvjew==',
                                iv: '6LsL3miSCP5XayrRF5Ld9A==',
                                data: 'AgDjy8+cIHKvGOj6zhBXEnxma/LPmQY1rA5a4wHo2IjbM6NTfyBK6WCWS5UxCs4mEmy+JQkKyvyqZl0i+A54M7gspEHxQY0STwa6H9+ku5cHceHkP1ovKiQOAQr8nhJk/+9VAeGhzJWwaJhUMADG9II9RxyS6HGL0SCEe4dNkgA2YNXyYECIOQmr+n8jy3NXHW/ZgqdcnH2Dh4dCLrCqew==',
                            },
                        },
                    };
                }

                return { title: `Inscripci\u00f3n Pastoral - ${item.label}` };
            })(),
        })),
    },
    encuestaJuvenil: {
        label: 'Encuesta Juvenil Salesiana',
        description: 'Paneles de encuesta por grupo de respuesta y colegio.',
        selectorLabel: 'Buscar colegio',
        categories: {
            jovenesColegios: {
                label: 'J\u00f3venes - Colegios',
                items: schoolItems.map((item) => ({
                    ...item,
                    dashboard: (() => {
                        if (item.id === 'total') {
                            return {
                            title: 'J\u00f3venes - Colegios - Total',
                            encryptedUrls: {
                                admin: {
                                    salt: 'kPrSoAvXHRqJAvpU/C2plg==',
                                    iv: 'wuIGENIrn3SveC2WZScCsA==',
                                    data: 'zDZnqjxwQLHr3IKJkjNdgsB2ocXDCTjHNI1Y6biO74wwu3amcI78iM3RWpwDTXb/FC92IiQNEWzZhV6rvwJUFLwArlibNebrGFiS8mByAIkTYHhNPUa0oNqTx3UmK2nNQVWmGkZO5D8AGSn+5ClII53oO3sIFSdxCuCkB4+n1iosXr7BsYlUdarh8f+fL5N9/fEhnBK8u9r6PXKwEVhmfQ==',
                                },
                                Colegio01: {
                                    salt: '+PC0eB1aP2wezahmZk3AiA==',
                                    iv: '4osjudmjwS++mEToESy8SQ==',
                                    data: 'DkEef821Z4L2OAqSou+NUFDU5CNY/a3VgYxRJMmMOPcPsTDArw166O5WmGnaw54mDzaPg1ZUOFedGkbbGyBt6RoWazx+JRPJBUDBNWo6nvIitfpq1sp97FYZUcJtEfodgXDdZ7EWyVgI+nqA2bXKgEYJ/Ab1Ie4tai0Ma7kCbQsJbiMY/6IDj8zneprveIvYwl/t0rWf/ZoINTpNxCghTw==',
                                },
                            },
                            };
                        }

                        if (item.id === 'colegio-01') {
                            return {
                                title: 'J\u00f3venes - Colegios - La Serena',
                                encryptedUrls: {
                                    admin: {
                                        salt: 'u/6AJo895UMKYJnuufv3Gw==',
                                        iv: 'HyNMH4qIwYggXB74I3PChA==',
                                        data: 'gdweIT7me3kSf0HJDS7nSrSk7yoY7w0TSOYnJe5DkqSl3G9u4hikf9+9Eo9vpMIoig3q1g3VPAya6I/ZZCW6KMLV3ldxG4KphdJK/o39bPW2YW3r+QC2X0/XwUkaeIMUtoRLCT7NUtvzmeqwLaT3DrAcplirn7v3GKMbLia8cTzaklnVY9K1vy+N7reDjnDd1qoK0o5Y3mfcQpdp+C80bg==',
                                    },
                                    Colegio01: {
                                        salt: 'oBvc9Kkr67gmt649mRj8Vw==',
                                        iv: 'O7pWtd+P5QkBO1m3fFE/fQ==',
                                        data: 'gfYFO5G5au5ShBBGAqpYI+NuSqjk/J4xNMNYIxprrUDYMqt9cZebzpluFBpcF0/0ULq9rU2OXbO4uJbZtRkfJlgDSMChMynKw6UmoJhPIhxosnKizlBWKhTQvIN2CO1NH4/3VdVdULi3OdVoMxgtyH49KtvFHeld3e7ypbKsPIyqmAhbFtIyyCwXUmHbUEqU3BTRlIBJZW5goxJV8IoZzA==',
                                    },
                                },
                            };
                        }

                        return { title: `J\u00f3venes - Colegios - ${item.label}` };
                    })(),
                })),
            },
            apoderadosColegios: {
                label: 'Apoderados - Colegios',
                items: schoolItems.map((item) => ({
                    ...item,
                    dashboard: (() => {
                        if (item.id === 'total') {
                            return {
                            title: 'Apoderados - Colegios - Total',
                            encryptedUrls: {
                                admin: {
                                    salt: '++p+VtdgrpHqw5/nortVjg==',
                                    iv: '8ALMpLE/+xin+cLr3O24CA==',
                                    data: '4oOmzYlJ/OjnP1u7EpwmvFCcXWtcsntbntqJQUFuhsv3j8lIcsA16ybHM4vt6izQiJ1n+9Pvoh7FzdFjNsOZ0QUOpuQPiC1CI4IgV8Kole0q9LphHjUrHJ2zrrbCwRWFxaUhPmq0gWV7OQyEvGUL4ss58NfDU2PUrOj1lLpF7HdulDkjWi4x614YrYLshMIrURqG95KpVdQB7mtRqVRDdA==',
                                },
                            },
                            };
                        }

                        if (item.id === 'colegio-01') {
                            return {
                                title: 'Apoderados - Colegios - La Serena',
                                encryptedUrls: {
                                    admin: {
                                        salt: 'SvfDjh3gGRBIpYZOSl1THg==',
                                        iv: '9+n5hAc0rg/uaYoZuI3JNQ==',
                                        data: 'Y3tp/w/7YmenfurmN/vb7WSaMtyFj8KHhumhw4zj/8P1/wv6a0CZmxSpt/qkYReBo7anLlMmgpbsFa7c7y4JHJ67Vv85ovvACc1yDBaViwmKwugXr4NmGwiLfw5KszfX/Xg+w2s+3dISLI0CYawPrODwiMBhmUCpyanpoka/M87tZihbdabiHMgKOH5B9UQ98W0MGVFyGKVaUanweMy3FQ==',
                                    },
                                    Colegio01: {
                                        salt: 'l1Y5jSYKAbuXdzaq9qsARA==',
                                        iv: 'A+bu3Y61v2yXawQ/J7mHZA==',
                                        data: 'Y+ozTk2IbUTMbXSA4w+6uwUYXersRJwHkxzUAf+BLMbwRuwViutOvsTa+igKAO2i7Pb3MhE06WaH6cvMv5cm9CV9umV7cHh4R9xpN9zu1c6ekOqXUHWmMj+QOdQeF0EATHDYdOB8sSKpeX1MX0vzAf/Aok5GZQH8fTfGHnBbs7Od3Lp14ASgIuHWDeDJNc8tHBB5d9HJsyQADYkJWhpHnQ==',
                                    },
                                },
                            };
                        }

                        return { title: `Apoderados - Colegios - ${item.label}` };
                    })(),
                })),
            },
            educadoresPersonal: {
                label: 'Educadores - Personal',
                items: schoolItems.map((item) => ({
                    ...item,
                    dashboard: item.id === 'colegio-01'
                        ? {
                            title: 'Educadores - Personal - La Serena',
                            encryptedUrls: {
                                admin: {
                                    salt: '4YYyomv3kcLgBxIV46XZ2w==',
                                    iv: 'H3mmZEWtdtI7eGVluFEmBg==',
                                    data: 'C0Ze58RtbtfmWyKwBqxAvF3ahbY6xJA+3O4b0f/zstZyUJ3LEBuBGl4i9OX7WAnZu86bkQHEJuJ5HlkphvrX3z6B/0UnAuN72Yq9yGwjtcKAQ7SNr9SE2Hh94NykhGQrOO/l+CcFYh/6xznqVmByIkKBjh0kbOr1tA4PQx1lnuaiEQXsIf+5iE0SDht9QxNlpl53SQUJuuKNfY34AzkwbQ==',
                                },
                                Colegio01: {
                                    salt: 'wU8OzEv2LWUzfX7mJrgYBg==',
                                    iv: 'BNQ8/XNRlEfm0nMcQW7nMg==',
                                    data: '0PJfbRhJwm5tdA6JdjH18cXlWC/6BeRs3hAIeSbCr4vKQ9idwSGuWFR6AJnmV54BtDwjH6R+8InCqWSs3gd7XuVlBiQ7vZwydp6ram0ivgOGxyqlGEZEZJSX20VJUojFrlCKi1SzMoLgLPWAnx8gZzIa3g6fjI5eCY5SBtsEKVl790TRRVgInKjGSu5pGGhbDgEHxunCdDGCgKWWkWFOKg==',
                                },
                            },
                        }
                        : { title: `Educadores - Personal - ${item.label}` },
                })),
            },
            parroquiasSantuarios: {
                label: 'Parroquias - Santuarios',
                selectorLabel: 'Buscar parroquia',
                items: [
                    {
                        id: 'total',
                        label: 'Total',
                        dashboard: {
                            title: 'Parroquias - Santuarios - Total',
                            encryptedUrls: {
                                admin: {
                                    salt: '6/pIRSb6YFllv0ZS6FfDcA==',
                                    iv: '6FQoDa5BgzE6ChBnvX6v3g==',
                                    data: 'eugWjfvt7jNkuMDLAAGAQPHRe+QiyTfvRhcuc4NBSppTX5W0BaC0JCUBUSaRr6iDiKvcNMM8zpQZMGLTW0yje4q2n1aS5MWYk0kO39xJ5oxOr20cOPJIlbKRyCGAE4d7BjX7Tz6mGeG6S+SwegyeOn3H8xotRh/LnI4Vm8gx85iXO6W5O5JOGdHB/4FUtbBU+dxUi6OqnUSdmuxA/qaSKQ==',
                                },
                                Colegio01: {
                                    salt: 'nM9l7i5XAenQ21GejUzFAg==',
                                    iv: 'SWtCz5zRs8wxesr8VCELeQ==',
                                    data: 'yMrjyiN8HW/nizZ9Z3CnXwuzlLWv4PrY1LUi3TkfJSAR68TvsGqe8sWVProlgzKLV8Gw5yuWdwtMXO+zBnxPsvYkbVbu8rPVl7wkVkAsn2g9dJieVM3Bv7z8nXbE2gxEwlrFU11LVgnn9Yd8RhBq+LNinDM8OUNVTPBHZ6XbzCSEZH2r3fN/BYaoyxkkPXLYLwDvx1zZWUUaVwdBux00hg==',
                                },
                            },
                        },
                    },
                    {
                        id: 'parroquia-01',
                        label: 'Parroquia 01',
                        dashboard: { title: 'Parroquias - Santuarios - Parroquia 01' },
                    },
                    {
                        id: 'parroquia-02',
                        label: 'Parroquia 02',
                        dashboard: { title: 'Parroquias - Santuarios - Parroquia 02' },
                    },
                    {
                        id: 'parroquia-03',
                        label: 'Parroquia 03',
                        dashboard: { title: 'Parroquias - Santuarios - Parroquia 03' },
                    },
                    {
                        id: 'parroquia-04',
                        label: 'Parroquia 04',
                        dashboard: { title: 'Parroquias - Santuarios - Parroquia 04' },
                    },
                    {
                        id: 'parroquia-05',
                        label: 'Parroquia 05',
                        dashboard: { title: 'Parroquias - Santuarios - Parroquia 05' },
                    },
                ],
            },
        },
    },
};
