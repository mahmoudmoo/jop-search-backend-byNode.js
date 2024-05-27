import { nanoid } from "nanoid";
import { userModel } from "../../../../DB/models/user.model.js";
import { sendMail } from "../../../utils/email.js";
import { genrateToken, verifyToken } from "../../../utils/genrateAndVerifyToken.js";
import { comparePass, hashPass } from "../../../utils/hashAndCompare.js";

export const signUp = async (req, res, next) => {
    const { email, recoveryEmail, firstName, lastName, mobileNumber } = req.body;
    if (email == recoveryEmail) {
        return next(new Error('email and recoveryEmail must be different', { cause: 409 }))
    }
    if (await userModel.findOne({ email })) {
        return next(new Error('email is alerady exist', { cause: 409 }))
    }
    if (await userModel.findOne({ mobileNumber })) {
        return next(new Error('mobileNumber is alerady exist', { cause: 409 }))
    }
    const token = genrateToken({ payload: { email } })
    const link = `${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}`
    const html = `<h1>hello ${firstName}</h1>
    <a href='${link}'>verify your mail</a>`
    req.body.password = hashPass({ password: req.body.password, salt: 8 })
    req.body.userName = `${firstName} ${lastName}`
    const user = await userModel.create(req.body)
    sendMail({ to: email, subject: "confirm our email", html })
    res.status(201).json({ messagge: 'done', user })
}

export const confirmEmail = async (req, res, next) => {
    const { token } = req.params;
    const payload = verifyToken({ token })
    console.log(payload);
    const user = await userModel.findOne({ email: payload.email })
    user ? null : res.redirect("https://www.google.com/");
    user.confirmEmail ? res.redirect("https://www.facebook.com/") : null;
    await userModel.updateOne({ email: user.email }, { confirmEmail: true })
    res.redirect("https://www.facebook.com/")
}

export const login = async (req, res, next) => {
    const { fild, password } = req.body;
    const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    let user;
    if (pattern.test(fild)) {
        user = await userModel.findOne({ email: fild, isDeleted: false })
    } else {
        user = await userModel.findOne({ mobileNumber: fild, isDeleted: false })
    }
    if (!user) {
        return next(new Error('email or mobileNumber  is not found', { cause: 404 }))
    }
    if (!user.confirmEmail) {
        return next(new Error('email is not confirmed', { cause: 400 }))
    }

    if (!comparePass({ password, hashPassword: user.password })) {
        return next(new Error('password is not true'))
    }


    await userModel.updateOne({ email: user.email }, { status: 'online' })
    const token = genrateToken({ payload: { _id: user._id, role: user.role } })
    res.status(200).json({ messagge: 'done', token })
}

export const updateAccount = async (req, res, next) => {
    const { email, recoveryEmail, firstName, lastName, mobileNumber, DOB } = req.body;
    if (email == recoveryEmail) {
        return next(new Error('email and recoveryEmail must be different', { cause: 409 }))
    }
    if (await userModel.findOne({ email })) {
        return next(new Error('email is alerady exist', { cause: 409 }))
    }
    if (await userModel.findOne({ mobileNumber })) {
        return next(new Error('mobileNumber is alerady exist', { cause: 409 }))
    }
    const token = genrateToken({ payload: { email } })
    const link = `${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}`
    const html = `<h1>hello ${firstName}</h1>
    <a href='${link}'>verify your mail</a>`
    const userName = `${firstName} ${lastName}`
    const user = await userModel.findOneAndUpdate(
        { _id: req.user._id },
        { email, recoveryEmail, userName, lastName, firstName, mobileNumber, DOB, confirmEmail: false, status: "offline" },
        { new: true }
    )
    sendMail({ to: email, subject: "confirm your email", html })
    res.status(201).json({ messagge: 'done', user })
}

export const deleteAccount = async (req, res, next) => {
    await userModel.updateOne({ _id: req.user._id }, { isDeleted: true, status: "offline" })
    res.status(200).json({ messagge: 'done' })
}

export const getAccountdata = async (req, res, next) => {
    const userData = await userModel.findOne({ _id: req.user._id }).select('userName email recoveryEmail mobileNumber DOB gender')
    res.status(200).json({ messagge: 'done', user: userData })
}

export const getAnotherAccountdata = async (req, res, next) => {
    const { _id } = req.params
    const userData = await userModel.findOne({ _id }).select('userName email recoveryEmail mobileNumber DOB gender')
    res.status(200).json({ messagge: 'done', user: userData })
}

export const updatePass = async (req, res, next) => {
    const { oldPass, newPass } = req.body
    if (oldPass == newPass) {
        return next(new Error('old password and new password must be different'))
    }
    const userData = await userModel.findOne({ _id: req.user._id })
    if (!comparePass({ password: oldPass, hashPassword: userData.password })) {
        return next(new Error('password is not true'))
    }
    await userModel.updateOne({ _id: req.user._id }, { password: hashPass({ password: newPass, salt: 8 }) })
    res.status(200).json({ messagge: 'done' })
}


export const sendCodeForForgetPass = async (req, res, next) => {
    const { email } = req.body;
    const user = await userModel.findOne({ email, isDeleted: false })
    if (!user) {
        return next(new Error('email is not found', { cause: 404 }));
    }
    if (!user.confirmEmail) {
        return next(new Error('confirm your email', { cause: 404 }));
    }

    const code = nanoid()
    sendMail({ to: email, subject: "forget password", html: `<h1>code : ${code}</h1>` })
    await userModel.updateOne({ email }, { code })
    res.status(200).json({ messagge: 'cheack your email' })
}

export const ForgetPass = async (req, res, next) => {
    const { email, code } = req.body;
    const user = await userModel.findOne({ email, isDeleted: false })
    if (!user) {
        return next(new Error('email is not found', { cause: 404 }));
    }
    if (user.code != code || code == null) {
        return next(new Error('wronge code', { cause: 404 }));
    }
    req.body.password = hashPass({ password: req.body.password, salt: 8 })
    await userModel.updateOne({ email }, { password: req.body.password, status: "offLine", code: null })
    res.status(200).json({ messagge: 'done' })
}

export const getAccountsforRecoveryMail = async (req, res, next) => {
    const users = await userModel
        .find({ recoveryEmail: req.body.recoveryEmail, isDeleted: false })
        .select('userName email recoveryEmail mobileNumber DOB gender')
    res.status(200).json({ messagge: 'done', users })
}




