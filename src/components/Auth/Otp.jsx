import InputGroup from "../FormElements/InputGroup";

export default function Otp({ email, setMode, setResendTimer, resendTimer }) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInput = (setter) => (e) => {
    const { value } = e.target;
    setter(value);
  };

  // Handle OTP verification
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch(`/api/v1/auth/verify-otp`, {
      method: "POST",
      body: JSON.stringify({ email, otp }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      toast.success("OTP verified successfully!");
      setMode("login");
    } else {
      toast.error("Invalid OTP");
    }
    setLoading(false);
  };

  // Resend OTP
  const handleResendOtp = async () => {
    if (resendTimer === 0) {
      await fetch(`/api/v1/auth/resend-otp?email=${email}`);
      setResendTimer(30);

      //   const timer = setInterval(() => {
      //     setResendTimer((prev) => {
      //       if (prev <= 1) {
      //         clearInterval(timer);
      //         return 0;
      //       }
      //       return prev - 1;
      //     });
      //   }, 1000);
    }
  };

  // Countdown timer for resend button
  useEffect(() => {
    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <h2 className="mb-2 text-2xl font-bold text-dark dark:text-white">
        Verify Email
      </h2>
      <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        Enter the 6-digit code sent to <strong>{email}</strong>
      </p>
      <form onSubmit={handleVerifyOtp} className="space-y-4">
        <InputGroup
          name="otp"
          placeholder="Enter OTP"
          handleChange={handleInput(setOtp)}
          value={otp}
          type="text"
          maxLength="6"
          autoFocus
          required
        />
        <button
          type="submit"
          className="w-full rounded bg-primary py-2 text-white hover:bg-primary/90"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
      <button
        onClick={handleResendOtp}
        disabled={resendTimer > 0}
        className="mt-4 w-full text-sm text-primary disabled:opacity-50"
      >
        Resend OTP {resendTimer > 0 && `(${resendTimer}s)`}
      </button>
    </>
  );
}
