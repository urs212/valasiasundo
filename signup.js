import { auth, db } from "./firebase.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

// EmailJS 초기화
emailjs.init("PXy5dWLVSSQbQwKCj");

let realCode = "";

// 인증 코드 전송
window.sendCode = () => {
    const email = document.getElementById("email").value;

    if (!email) return alert("이메일을 입력하세요!");

    // 6자리 랜덤 코드 생성
    realCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    const params = {
        to_email: email,          // EmailJS 템플릿 변수와 동일하게
        verification_code: realCode,
        name: "User",
        email: email
    };

    emailjs.send("service_ifdeiee", "template_xkche7g", params)
    .then(() => alert("인증코드가 전송되었습니다."))
    .catch(err => alert("메일 전송 실패: " + err.text));
};

// 회원가입
window.signup = async () => {
    const email = document.getElementById("email").value;
    const codeInput = document.getElementById("codeInput").value;
    const password = document.getElementById("password").value;

    if (codeInput !== realCode) {
        alert("인증코드가 올바르지 않습니다!");
        return;
    }

    try {
        // Firebase 이메일/비밀번호 가입
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        // Firestore에 사용자 데이터 저장
        await setDoc(doc(db, "users", userCredential.user.uid), {
            email: email,
            createdAt: new Date().toISOString()
        });

        alert("회원가입 완료!");
        window.location.href = "login.html";
    } 
    catch (error) {
        alert("회원가입 실패: " + error.message);
    }
};
