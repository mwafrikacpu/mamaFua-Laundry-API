//CONFIG ENV
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const ApiError = require('../../utils/ApiError');
const isEmailValid = require('../../utils/emailValidation');

// GENERATE RANDOM UID
const crypto = require('crypto');

//UPLOAD IMAGE
const imageKit = require('../../middleware/imageKit');

const { accounts } = require('../models');

dotenv.config();

const login = async (req, res) => {
  try {
    const { email = '', password = '' } = req.body;
    const user = await accounts.findOne({ where: { email } });
    if (!user) throw new ApiError(400, 'Email tidak terdaftar.');
    if (!bcrypt.compareSync(password, user.password)) {
      throw new ApiError(400, 'Password salah.');
    }

    if (bcrypt.compareSync(password, user.password)) {
      // generate token utk user yg success login
      const token = jwt.sign(
        {
          id: user.id,
        },
        process.env.SECRET_KEY
      );
      res.status(200).json({
        message: 'Login berhasil.',
        token,
        data: user,
      });
    }
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message,
    });
  }
};

const register = async (req, res) => {
  try {
    const { email, no_telp, name, address, password, nik } = req.body;
    const User = await accounts.findOne({ where: { email: email } });
    // validasi
    const validateEmail = isEmailValid(email);
    if (!email) throw new ApiError(400, 'Email tidak boleh kosong.');
    if (!validateEmail) throw new ApiError(400, 'Email tidak valid.');
    if (!password) throw new ApiError(400, 'Password tidak boleh kosong.');
    if (!name) throw new ApiError(400, 'Nama tidak boleh kosong.');
    if (!no_telp) throw new ApiError(400, 'no telepon tidak boleh kosong.');
    if (User) throw new ApiError(400, 'Email telah terdaftar.');
    if (password.length < 8) {
      throw new ApiError(400, 'Masukkan password minimal 8 karakter');
    }
    // hash password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // buat user baru
    const user = await accounts.create({
      nik: nik || null,
      password: hashedPassword,
      name: name,
      address: address,
      role: 'user',
      noTelp: no_telp,
      email: email,
    });

    // generate token utk user yg success login
    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.SECRET_KEY
    );

    res.status(200).json({
      message: 'Registrasi berhasil',
      token: token,
      data: user,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message,
    });
  }
};

const info = async (req, res) => {
  const user = req.user || {};

  try {
    res.status(200).json({
      message: 'Berhasil Mendapatkan Data.',
      data: user,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message,
    });
  }
};

module.exports = { login, register, info };
