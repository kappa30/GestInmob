"use strict";
module.exports = {
    token: (req, res) => {
        const propietario = req.propietario;
        res.json({
            estado: "succes",
            data: propietario
        });
    }
};
