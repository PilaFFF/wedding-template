import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { name, attending, drink } = await request.json();

        const botToken = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;

        if (!botToken || !chatId) {
            return NextResponse.json(
                { error: 'Telegram credentials missing' },
                { status: 500 },
            );
        }

        const text = `🎉 **Новый ответ на приглашение!**\n\n👤 **Имя:** ${name}\n✅ **Придет:** ${attending ? 'Да' : 'Нет'}\n🍷 **Предпочтения:** ${drink || 'Не указано'}`;

        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text,
                parse_mode: 'Markdown',
            }),
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to send message' },
            { status: 500 },
        );
    }
}
