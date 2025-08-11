import { useState } from 'react';

export default function Home() {
  const [file, setFile] = useState(null);
  const [qrCode, setQrCode] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('请选择音频文件');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('audio', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      
      if (data.success) {
        setQrCode(data.qrCode);
        setAudioUrl(data.audioUrl);
      } else {
        alert('上传失败：' + data.error);
      }
    } catch (error) {
      alert('上传失败：' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>🎵 音频转二维码生成器</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          style={{ marginBottom: '10px' }}
        />
        <br />
        <button 
          onClick={handleUpload} 
          disabled={loading}
          style={{
            padding: '10px 20px',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? '上传中...' : '生成二维码'}
        </button>
      </div>

      {qrCode && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <h3>扫描二维码播放音频：</h3>
          <img src={qrCode} alt="QR Code" style={{ maxWidth: '300px' }} />
          
          {audioUrl && (
            <div style={{ marginTop: '20px' }}>
              <h4>预览播放：</h4>
              <audio controls style={{ width: '100%' }}>
                <source src={audioUrl} type="audio/mpeg" />
                您的浏览器不支持音频播放。
              </audio>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
