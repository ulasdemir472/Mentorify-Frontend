import { useEffect, useState } from "react";
import GenericButton from "@/components/generic-button";
import { toast } from "react-toastify";
import { useAuth } from "@/contexts/AuthContext";

const VerificationForm = ({ password, newPassword }) => {
  const [code, setCode] = useState("");
  const { user } = useAuth();

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]?$/.test(value)) {
      let newCode = code.split("");
      newCode[index] = value;
      newCode = newCode.join("");
      setCode(newCode);

      if (value && index < 5) {
        document.getElementById(`code-${index + 2}`).focus();
      } else if (!value && index > 0) {
        document.getElementById(`code-${index}`).focus();
      }
    }
  };

  const sendCode = async (e) => {
    e.preventDefault();
    if (code.length < 6) return toast.error("Lütfen tüm alanları doldurun.");
    if (password !== newPassword) return toast.error("Şifreler uyuşmuyor.");
    const role = user.role === "Mentor" ? "mentors" : "mentees";
    try {
      const response = await fetch(
        "http://localhost:8800" +
          `/api/v1/${role}/${user.id}/verify-password-update`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            verificationCode: code,
            newPassword,
          }),
        }
      );

      const res = await response.json();
      console.log(res);

      if (res) {
        toast.success("Şifreniz başarıyla değiştirildi.");
        window.location.href = "/profile";
      }
    } catch (error) {
      toast.error("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  useEffect(() => {
    document.getElementById("code-1").focus();
  }, []);

  return (
    <form className="max-w-sm mx-auto" onSubmit={(e) => sendCode(e)}>
      <div className="flex mb-2 space-x-2 rtl:space-x-reverse">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index}>
            <label htmlFor={`code-${index + 1}`} className="sr-only">{`Code ${
              index + 1
            }`}</label>
            <input
              type="text"
              maxLength="1"
              id={`code-${index + 1}`}
              value={code[index] || ""}
              onChange={(e) => handleChange(e, index)}
              className="block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg"
              required
            />
          </div>
        ))}
      </div>
      <p
        id="helper-text-explanation"
        className="mt-2 text-sm text-gray-500 dark:text-gray-400"
      >
        Lütfen size gönderilen doğrulama kodunu girin.
      </p>
      <GenericButton type="submit" className="w-[40%] mt-12">
        Gönder
      </GenericButton>
    </form>
  );
};

export default VerificationForm;
