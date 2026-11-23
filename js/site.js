/* ====== SỬA THÔNG TIN CỦA BẠN Ở ĐÂY (chỉ cần sửa 1 chỗ) ====== */
var SITE = {
  name: 'Trương Long',
  mssv: 'MSSV: 231A290110',      // <-- điền mã sinh viên
  course: 'Lập trình Web - Kiểm tra giữa kỳ'
};

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('[data-name]').forEach(function (el) { el.textContent = SITE.name; });
  document.querySelectorAll('[data-mssv]').forEach(function (el) { el.textContent = SITE.mssv; });
  document.querySelectorAll('[data-course]').forEach(function (el) { el.textContent = SITE.course; });

  // Ảnh chưa có thì hiện khung giữ chỗ để trang không bị vỡ
  document.querySelectorAll('img[data-ph]').forEach(function (img) {
    function ph() {
      var t = img.getAttribute('data-ph');
      var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="360"><rect width="100%" height="100%" fill="#2a303b"/>' +
        '<text x="50%" y="46%" fill="#9aa4b2" font-family="Arial" font-size="22" text-anchor="middle">Chưa có ảnh</text>' +
        '<text x="50%" y="58%" fill="#ffb454" font-family="Arial" font-size="18" text-anchor="middle">' + t + '</text></svg>';
      img.onerror = null;
      img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    }
    img.addEventListener('error', ph);
    if (img.complete && img.naturalWidth === 0) ph();
  });
});
