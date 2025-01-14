const TELEGRAM_BOT_TOKEN = "YOUR_BOT_TOKEN";
const TELEGRAM_CHAT_ID = "YOUR_CHAT_ID";

export const sendTelegramNotification = async (orderDetails: any) => {
  try {
    const message = `
🎥 New Video Call Booking!

👤 Contact: ${orderDetails.contactMethod} - ${orderDetails.username}
📅 Plan: ${orderDetails.selectedPlan}
💰 Price: ₹${orderDetails.price}
👩 Model: ${orderDetails.selectedModel?.name || 'Not selected'}
📆 Date: ${orderDetails.selectedDate?.toLocaleDateString()}
⏰ Time: ${orderDetails.selectedTime}
🤝 Platform: ${orderDetails.meetingPlatform}
    `;

    console.log("Sending Telegram notification:", message);

    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      })
    });

    const data = await response.json();
    console.log("Telegram notification response:", data);
  } catch (error) {
    console.error("Error sending Telegram notification:", error);
  }
};