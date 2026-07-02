const sendEmail = async (to, subject, message) => {
  try {
    console.log("----------- EMAIL -----------");
    console.log("To:", to);
    console.log("Subject:", subject);
    console.log("Message:", message);
    console.log("-----------------------------");

    return {
      success: true,
      message: "Email sent successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

module.exports = sendEmail;