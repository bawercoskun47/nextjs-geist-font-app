# Vakıf Sorgulama - Foundation Search Application

Bu uygulama, VGM.gov.tr sitesinden İstanbul'daki yeni kurulan burs veren vakıfları listelemek için geliştirilmiştir.

## Özellikler

- VGM.gov.tr sitesinden otomatik veri çekme
- İstanbul'daki yeni vakıfları filtreleme
- Burs veren vakıfları listeleme
- Tüm sayfalardaki verileri toplama
- Responsive tasarım

## Arama Kriterleri

- **Şehir**: İstanbul (ID: 82)
- **Kategori**: Yeni Vakıflar (ID: 5)  
- **Burs Durumu**: Burs Veren Vakıflar

## Kullanım

1. Uygulamayı çalıştırın: `npm run dev`
2. http://localhost:3000 adresine gidin
3. "Vakıfları Ara" butonuna tıklayın
4. Sonuçları görüntüleyin

## Teknik Detaylar

- **Framework**: Next.js 14
- **Scraping**: Axios + Cheerio
- **Styling**: CSS
- **Language**: TypeScript

Uygulama, belirtilen kriterlere uygun tüm vakıf bilgilerini VGM.gov.tr sitesinin tüm sayfalarından çekerek kapsamlı bir liste oluşturur.