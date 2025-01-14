import { supabase } from '../lib/supabaseClient';

export const sendTelegramNotification = async (orderDetails: any) => {
  try {
    // Get secrets from Supabase
    const { data: secretData, error: secretError } = await supabase
      .from('secrets')
      .select('value')
      .eq('name', 'TELEGRAM_BOT_TOKEN')
      .single();

    const { data: chatIdData, error: chatIdError } = await supabase
      .from('secrets')
      .select('value')
      .eq('name', 'TELEGRAM_CHAT_ID')
      .single();

    if (secretError || chatIdError) {
      console.error('Error fetching secrets:', secretError || chatIdError);
      return;
    }

    const TELEGRAM_BOT_TOKEN = secretData?.value;
    const TELEGRAM_CHAT_ID = chatIdData?.value;

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error('Telegram credentials not found');
      return;
    }

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