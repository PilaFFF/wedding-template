export interface RsvpFormData {
    fullName: string;
    attendance: string;
    drinks: string[];
}

export const sendTelegramMessage = async (
    data: RsvpFormData
): Promise<boolean> => {
    const BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;

    if (!BOT_TOKEN || !CHAT_ID) {
        console.error('Telegram credentials missing');
        return false;
    }

    const drinksText =
        data.drinks.length > 0 ? data.drinks.join(', ') : 'Не выбрано';

    const message = `💌 **Новый ответ на приглашение!**

👤 **ФИО:** ${data.fullName || 'Не указано'}
❓ **Присутствие:** ${data.attendance}
🍷 **Напитки:** ${drinksText}`;

    try {
        const response = await fetch(
            `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text: message,
                    parse_mode: 'Markdown',
                }),
            }
        );

        return response.ok;
    } catch (error) {
        console.error('Failed to send Telegram message:', error);
        return false;
    }
};
