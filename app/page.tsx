'use client'

import { useState } from 'react'

interface Foundation {
  name: string
  address: string
  purpose: string
  grantType?: string
}

export default function Home() {
  const [foundations, setFoundations] = useState<Foundation[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [totalFound, setTotalFound] = useState(0)

  const searchFoundations = async () => {
    setLoading(true)
    setError('')
    setFoundations([])
    
    try {
      const response = await fetch('/api/scrape-foundations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cityId: 82, // Istanbul
          foundationCategoryId: 5, // New foundations
          isGrant: true // Grant-giving foundations
        })
      })

      if (!response.ok) {
        throw new Error('Failed to fetch foundations')
      }

      const data = await response.json()
      
      if (data.success) {
        setFoundations(data.foundations || [])
        setTotalFound(data.total || 0)
      } else {
        throw new Error(data.error || 'Unknown error occurred')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <h1>Vakıf Sorgulama - Foundation Search</h1>
      <p>İstanbul'daki yeni kurulan burs veren vakıfları listeler</p>
      <p><strong>Arama Kriterleri:</strong></p>
      <ul>
        <li>Şehir: İstanbul (82)</li>
        <li>Kategori: Yeni Vakıflar (5)</li>
        <li>Burs Veren: Evet</li>
      </ul>
      
      <button 
        className="search-button" 
        onClick={searchFoundations}
        disabled={loading}
      >
        {loading ? 'Aranıyor...' : 'Vakıfları Ara'}
      </button>

      {error && (
        <div className="error">
          Hata: {error}
        </div>
      )}

      {loading && (
        <div className="loading">
          Vakıflar aranıyor... Tüm sayfalardan veri çekiliyor.
        </div>
      )}

      {totalFound > 0 && (
        <div>
          <h2>Bulunan Vakıflar (Toplam: {totalFound})</h2>
          <p>VGM.gov.tr sitesinden çekilen tüm sayfalardaki vakıf bilgileri:</p>
          
          {foundations.map((foundation, index) => (
            <div key={index} className="foundation-card">
              <h3>{foundation.name}</h3>
              <p><strong>Adres:</strong> {foundation.address}</p>
              <p><strong>Amaç:</strong> {foundation.purpose}</p>
              {foundation.grantType && (
                <p><strong>Burs Türü:</strong> {foundation.grantType}</p>
              )}
            </div>
          ))}
          
          <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
            <h3>Bilgilendirme</h3>
            <p>Bu uygulama VGM.gov.tr sitesinden belirtilen kriterlere uygun vakıf bilgilerini çeker:</p>
            <ul>
              <li>Şehir: İstanbul</li>
              <li>Vakıf Kategorisi: Yeni Vakıflar</li>
              <li>Burs Durumu: Burs Veren Vakıflar</li>
            </ul>
            <p>Tüm sayfalar taranarak kapsamlı bir liste oluşturulur.</p>
          </div>
        </div>
      )}
    </div>
  )
}