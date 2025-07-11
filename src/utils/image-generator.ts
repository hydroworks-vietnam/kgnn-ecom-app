import type { ICartItem } from "@/types/cart";

const generateCartCanvasImage = async (
  cart: ICartItem[],
  discount = 0,
  shippingFee = 0
) => {
  const pixelRatio = 2;
  const padding = 20;
  const itemHeight = 90;
  const imageSize = 80;
  const width = 700;
  const columnGap = 8;

  const availableWidth = width - 2 * padding;
  const imageColumnWidth = imageSize + columnGap;
  const remainingWidth = availableWidth - imageColumnWidth;

  const columnWidths = [
    remainingWidth * 0.24, // Product Name
    remainingWidth * 0.13, // Quantity
    remainingWidth * 0.19, // Original Price
    remainingWidth * 0.19, // Discount Price
    remainingWidth * 0.25, // Total
  ];

  const textXStart = padding + imageSize + columnGap;
  const headerHeight = 120;
  const footerHeight = 180;
  const summaryHeight = 120;
  const height = headerHeight + (cart.length * itemHeight) + summaryHeight + footerHeight + padding * 2;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  canvas.width = width * pixelRatio;
  canvas.height = height * pixelRatio;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.scale(pixelRatio, pixelRatio);

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  let y = padding;
  ctx.fillStyle = "#111827";
  ctx.font = "bold 18px Arial";
  const companyName = "CÔNG TY TNHH HYDROWORKS";
  ctx.fillText(companyName, (width - ctx.measureText(companyName).width) / 2, y);
  y += 24;

  ctx.font = "14px Arial";
  const lines = [
    "ĐC: Tầng 2, số 81 Cách Mạng Tháng 8, phường Bến Thành, quận 1, TP.HCM",
    "DT: 0981 250725 Mr Vương Trần",
    "Email: vhbaotram576@gmail.com",
    "Web: thietbihuycanh.com.vn",
  ];
  lines.forEach(line => {
    ctx.fillText(line, (width - ctx.measureText(line).width) / 2, y);
    y += 20;
  });

  ctx.font = "bold 16px Arial";
  ctx.fillText("BẢNG BÁO GIÁ", (width - ctx.measureText("BẢNG BÁO GIÁ").width) / 2, y + 10);
  y += 40;

  // Headers
  ctx.fillStyle = "#374151";
  ctx.font = "bold 14px Arial";
  const imageHeader = "Hình ảnh";
  ctx.fillText(imageHeader, padding + (imageSize - ctx.measureText(imageHeader).width) / 2, y);

  const headers = ["Tên sản phẩm", "Số lượng", "Giá gốc", "Giá giảm", "Tổng"];
  let headerX = textXStart;
  headers.forEach((header, index) => {
    const headerWidth = ctx.measureText(header).width;
    ctx.fillText(header, headerX + (columnWidths[index] - headerWidth) / 2, y);
    headerX += columnWidths[index] + columnGap;
  });

  y += 30;

  // Product rows
  for (const item of cart) {
    const rowStartY = y;
    let rowHeight = itemHeight;

    // Product image
    try {
      const img = await loadProxiedImage(item.product.images[0]);
      ctx.save();
      ctx.beginPath();
      const radius = 8;
      ctx.moveTo(padding, y);
      ctx.arcTo(padding + imageSize, y, padding + imageSize, y + imageSize, radius);
      ctx.arcTo(padding + imageSize, y + imageSize, padding, y + imageSize, radius);
      ctx.arcTo(padding, y + imageSize, padding, y, radius);
      ctx.arcTo(padding, y, padding + imageSize, y, radius);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(img, padding, y, imageSize, imageSize);
      ctx.restore();
    } catch {
      ctx.fillStyle = "#f3f4f6";
      ctx.fillRect(padding, y, imageSize, imageSize);
      ctx.fillStyle = "#888";
      ctx.font = "12px sans-serif";
      ctx.fillText("No Image", padding + 10, y + 20);
    }

    // Columns
    let columnX = textXStart;
    const discountPrice = item.product.unit_price * 0.9;
    const total = item.quantity * discountPrice;

    // Product name with wrapping
    ctx.fillStyle = "#F26043"; // primary
    ctx.font = "14px Arial";
    const maxProductNameWidth = columnWidths[0] - 10;
    const wrapped = wrapText(item.product.name, maxProductNameWidth, ctx);
    const lineHeight = 18;
    const textHeight = wrapped.length * lineHeight;
    if (textHeight + 20 > rowHeight) rowHeight = textHeight + 20;
    const nameY = rowStartY + (rowHeight - textHeight) / 2;
    wrapped.forEach((line, i) => {
      const lineX = columnX + (columnWidths[0] - ctx.measureText(line).width) / 2;
      ctx.fillText(line, lineX, nameY + i * lineHeight);
    });

    columnX += columnWidths[0] + columnGap;
    ctx.fillStyle = "#6b7280";
    ctx.font = "13px Arial";

    const values = [
      `${item.quantity}`,
      `${item.product.unit_price.toLocaleString()} đ`,
      `${discountPrice.toLocaleString()} đ`,
      `${total.toLocaleString()} đ`,
    ];

    for (let i = 0; i < values.length; i++) {
      const text = values[i];
      const widthText = ctx.measureText(text).width;
      const centerX = columnX + (columnWidths[i + 1] - widthText) / 2;
      ctx.fillText(text, centerX, rowStartY + rowHeight / 2);
      columnX += columnWidths[i + 1] + columnGap;
    }

    y += rowHeight;
  }

  // Divider
  ctx.strokeStyle = "#e5e7eb";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(padding, y);
  ctx.lineTo(width - padding, y);
  ctx.stroke();
  y += 20;

  const subtotal = cart.reduce((sum, item) => sum + item.quantity * (item.product.unit_price * 0.9), 0);
  const finalTotal = subtotal - discount + shippingFee;

  const drawSummaryRow = (label: string, value: string, bold = false, color = "#374151") => {
    ctx.font = bold ? "bold 16px Arial" : "14px Arial";
    ctx.fillStyle = color;
    ctx.fillText(label, padding, y);
    ctx.fillText(value, width - padding - ctx.measureText(value).width, y);
    y += 28;
  };

  drawSummaryRow("Tạm tính", `${subtotal.toLocaleString()} đ`);
  drawSummaryRow("Giảm giá", `${discount.toLocaleString()} đ`);
  drawSummaryRow("Phí vận chuyển", `${shippingFee.toLocaleString()} đ`);
  drawSummaryRow("Tổng cộng", `${finalTotal.toLocaleString()} đ`, true, "#F26043");

  // Footer Notes
  ctx.fillStyle = "#F26043";
  ctx.font = "14px Arial";
  y += 10;
  const notes = [
    "Ghi chú:",
    "1. Giá gốc trên chưa bao gồm thuế VAT.",
    "2. Bảng báo giá này có hiệu lực trong vòng 15 ngày kể từ ngày báo giá.",
    "3. Vật tư sẽ được lập mẫu kiểm tra trước khi sản xuất.",
    "4. Giá gốc đã bao gồm công lắp đặt và thi công lắp đặt hoàn chỉnh.",
    "5. Hết thời gian, nếu không thông báo thì sẽ không được giữ lại đơn hàng.",
    "6. Mọi ý kiến xin liên hệ Mr Vương Trần 0981 250725.",
    "Cảm ơn sự hợp tác của Quý Công ty. Trân trọng.",
  ];
  notes.forEach((note, i) => ctx.fillText(note, padding, y + i * 16));

  const now = new Date();
  const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

  const dataUrl = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.download = `Donhang_${formattedDate}_${now.getTime()}.png`;
  link.href = dataUrl;
  link.click();
};

const loadProxiedImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = `/api/proxy-image?url=${encodeURIComponent(src)}`;
  });
};

const wrapText = (text: string, maxWidth: number, ctx: CanvasRenderingContext2D) => {
  const words = text.split(' ');
  const lines = [];
  let currentLine = words[0];
  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const width = ctx.measureText(currentLine + " " + word).width;
    if (width < maxWidth) {
      currentLine += " " + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  lines.push(currentLine);
  return lines;
};

export { generateCartCanvasImage };