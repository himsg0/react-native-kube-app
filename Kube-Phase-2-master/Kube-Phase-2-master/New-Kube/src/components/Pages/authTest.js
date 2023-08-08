import React, { useState } from 'react';
import { firebase, auth } from '../../Firebase';

const Auth = () => {
	// Inputs
	const [mynumber, setnumber] = useState("");
	const [otp, setotp] = useState('');
	const [show, setshow] = useState(false);
	const [final, setfinal] = useState('');

    console.log("test", mynumber);
    console.log("test1", otp);
    console.log("test2", show);
    console.log("test3", final);

	// Sent OTP
	const signin = () => {

		if (mynumber === "" || mynumber.length < 10) return;

		let verify = new auth.RecaptchaVerifier('recaptcha-container')  
        auth().signInWithPhoneNumber(`+91${mynumber}`, verify).then((result) => {
			setfinal(result);
			alert("code sent")
			setshow(true);
		})
			.catch((err) => {
				alert(err);
				window.location.reload()
			});
	}

	// Validate OTP
	const ValidateOtp = () => {
		if (otp === null || final === null)
			return;
		final.confirm(otp).then((result) => {
			// success
            alert("Login Success");
		}).catch((err) => {
			alert("Wrong code");
		})
	}

	return (
		<div style={{ "marginTop": "200px" }}>
			<center>
				<div style={{ display: !show ? "block" : "none" }}>
					<input value={mynumber} onChange={(e) => {
					setnumber(e.target.value) }}
						placeholder="phone number" />
					<br /><br />
					{/* <div id="recaptcha-container"></div> */}
					<button onClick={signin}>Send OTP</button>
				</div>
				<div style={{ display: show ? "block" : "none" }}>
					<input type="text" placeholder={"Enter your OTP"}
						onChange={(e) => { setotp(e.target.value) }}></input>
					<br /><br />
					<button onClick={ValidateOtp}>Verify</button>
				</div>
			</center>
		</div>
	);
}

export default Auth;
