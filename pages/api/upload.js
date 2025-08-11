import QRCode from 'qrcode';

// 配置 API 路由
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // 简化版本：生成示例音频的二维码
    const audioUrl = 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav';
    
    // 生成二维码
    const qrCode = await QRCode.toDataURL(audioUrl, {
      width: 300,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });
    
    res.status(200).json({
      success: true,
      qrCode: qrCode,
      audioUrl: audioUrl,
      message: '二维码生成成功！'
    });
  } catch (error) {
    console.error('QR Code generation error:', error);
    res.status(500).json({ 
      success: false, 
      error: '生成二维码时出错：' + error.message 
    });
  }
}
