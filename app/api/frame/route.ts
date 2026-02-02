import { NextRequest, NextResponse } from 'next/server';
import { getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { message } = await getFrameMessage(body);

  // 👉 STAN 1: kliknięcie pierwszego przycisku
  if (message?.button === 1) {
    return new NextResponse(
      getFrameHtmlResponse({
        image: {
          src: `${process.env.NEXT_PUBLIC_URL}/success.png`,
          aspectRatio: '1:1',
        },
        buttons: [
          {
            label: '🔁 Wróć',
          },
        ],
      }),
    );
  }

  // 👉 STAN DOMYŚLNY
  return new NextResponse(
    getFrameHtmlResponse({
      image: {
        src: `${process.env.NEXT_PUBLIC_URL}/cover.png`,
        aspectRatio: '1:1',
      },
      buttons: [
        {
          label: '👉 Kliknij mnie',
        },
      ],
    }),
  );
}
