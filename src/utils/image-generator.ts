import type { ICartItem } from "@/types/cart";

const generateCartCanvasImage = async (
  cart: ICartItem[],
  discount = 0,
  shippingFee = 0
) => {
  const pixelRatio = 2;
  const padding = 24;
  const itemHeight = 90;
  const imageSize = 80;
  const width = 700;
  const availableWidth = width - 2 * padding; // Total width for the table (700 - 48 = 652px)
  const columnGap = 24;
  const imageColumnWidth = imageSize + columnGap; // Width for the image column (80 + 24 = 104px)
  const remainingWidth = availableWidth - imageColumnWidth; // Width for the four columns (652 - 104 = 548px)
  const columnWidths = [
    remainingWidth * 0.20, // Product Name (20% of remaining width)
    remainingWidth * 0.20, // Quantity (20% of remaining width)
    remainingWidth * 0.25, // Unit Price (25% of remaining width)
    remainingWidth * 0.25, // Total (25% of remaining width)
  ];
  const textXStart = padding + imageSize + columnGap;
  const headerHeight = 120; // Height for header
  const footerHeight = 180; // Height for footer
  const summaryHeight = 120; // Estimated height for summary rows
  const height = headerHeight + (cart.length * itemHeight) + summaryHeight + footerHeight + padding * 2; // Dynamic height

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

  // Header (Center-aligned)
  let y = padding;
  ctx.fillStyle = "#111827";
  ctx.font = "bold 18px Arial";
  const companyName = "CÔNG TY TNHH HYDROWORKS";
  ctx.fillText(companyName, (width - ctx.measureText(companyName).width) / 2, y);
  y += 24;

  ctx.font = "14px Arial";
  const address = "ĐC: Tầng 2, số 81 Cách Mạng Tháng 8, phường Bến Thành, quận 1, TP.HCM";
  ctx.fillText(address, (width - ctx.measureText(address).width) / 2, y);
  y += 20;
  const phone = "DT: 0981 250725 Mr Vương Trần";
  ctx.fillText(phone, (width - ctx.measureText(phone).width) / 2, y);
  y += 20;
  const email = "Email: vhbaotram576@gmail.com";
  ctx.fillText(email, (width - ctx.measureText(email).width) / 2, y);
  y += 20;
  const website = "Web: thietbihuycanh.com.vn";
  ctx.fillText(website, (width - ctx.measureText(website).width) / 2, y);
  y += 40;

  ctx.font = "bold 16px Arial";
  ctx.fillText("BẢNG BÁO GIÁ", width / 2 - ctx.measureText("BẢNG BÁO GIÁ").width / 2, y + 3);
  y += 10;

  // Table Headers (Center-aligned)
  ctx.fillStyle = "#374151";
  ctx.font = "bold 14px Arial";
  const imageHeader = "Hình ảnh";
  const imageHeaderWidth = ctx.measureText(imageHeader).width;
  ctx.fillText(imageHeader, padding + (imageSize - imageHeaderWidth) / 2, y + 24);

  const headers = ["Tên sản phẩm", "Số lượng", "Đơn giá", "Tổng"];
  let headerX = textXStart;
  headers.forEach((header, index) => {
    const headerWidth = ctx.measureText(header).width;
    const centerX = headerX + (columnWidths[index] - headerWidth) / 2; // Center within the column
    ctx.fillText(header, centerX, y + 24);
    headerX += columnWidths[index] + columnGap;
  });
  y += 40;

  // Products (Table with 4 columns, center-aligned)
  for (const item of cart) {
    const rowStartY = y; // Store the starting Y position for this row
    let rowHeight = itemHeight; // Default row height

    // Image (already centered by its container)
    try {
      const img = await loadProxiedImage(item.product.images[0]);
      const radius = 8;

      ctx.save();
      ctx.beginPath();
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

    // Columns: Product Name, Quantity, Unit Price, Total Price (center-aligned)
    let columnX = textXStart;
    const total = item.quantity * item.product.unit_price;

    ctx.fillStyle = "#6b7280";
    ctx.font = "14px Arial";

    // Product Name - Wrap text if too long
    if (item.product.name.length > 50) {
      item.product.name = item.product.name.substring(0, 47) + "..."; // 47 + 3 dots = 50 chars
    }
    const maxProductNameWidth = columnWidths[0] - 10; // Leave small margin
    const lines = wrapText(item.product.name, maxProductNameWidth, ctx);

    // Adjust row height based on number of lines
    const lineHeight = 18;
    const textHeight = lines.length * lineHeight;
    if (textHeight > rowHeight - 40) { // 40 is the vertical positioning offset
      rowHeight = textHeight + 40;
    }
    
    // Calculate vertical center position for the wrapped text
    const textY = rowStartY + (rowHeight - textHeight) / 2;
    
    // Draw each line of the wrapped text
    lines.forEach((line, index) => {
      const lineWidth = ctx.measureText(line).width;
      const lineX = columnX + (columnWidths[0] - lineWidth) / 2;
      ctx.fillText(line, lineX, textY + index * lineHeight);
    });
    
    columnX += columnWidths[0] + columnGap;

    // Quantity - Vertically center with product name
    const quantityText = `${item.quantity}`;
    const quantityWidth = ctx.measureText(quantityText).width;
    const quantityX = columnX + (columnWidths[1] - quantityWidth) / 2;
    ctx.fillText(quantityText, quantityX, rowStartY + rowHeight/2);
    columnX += columnWidths[1] + columnGap;

    // Unit Price - Vertically center with product name
    const unitPriceText = `${item.product.unit_price.toLocaleString()} đ`;
    const unitPriceWidth = ctx.measureText(unitPriceText).width;
    const unitPriceX = columnX + (columnWidths[2] - unitPriceWidth) / 2;
    ctx.fillText(unitPriceText, unitPriceX, rowStartY + rowHeight/2);
    columnX += columnWidths[2] + columnGap;

    // Total Price - Vertically center with product name
    const totalText = `${total.toLocaleString()} đ`;
    const totalWidth = ctx.measureText(totalText).width;
    const totalX = columnX + (columnWidths[3] - totalWidth) / 2;
    ctx.fillText(totalText, totalX, rowStartY + rowHeight/2);

    y += rowHeight; // Use the potentially adjusted row height
  }

  // Divider
  ctx.strokeStyle = "#e5e7eb";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(padding, y);
  ctx.lineTo(width - padding, y);
  ctx.stroke();
  y += 20;

  // Summary Rows
  const subtotal = cart.reduce((sum, item) => sum + item.quantity * item.product.unit_price, 0);
  const finalTotal = subtotal - discount + shippingFee;

  const drawSummaryRow = (label: string, value: string, bold = false) => {
    ctx.fillStyle = "#374151"; // gray-700
    ctx.font = bold ? "bold 16px Arial" : "14px Arial";
    ctx.fillText(label, padding, y);
    ctx.fillText(value, width - padding - ctx.measureText(value).width, y);
    y += 28;
  };

  drawSummaryRow("Tạm tính", `${subtotal.toLocaleString()} đ`);
  drawSummaryRow("Giảm giá", `${discount.toLocaleString()} đ`);
  drawSummaryRow("Phí vận chuyển", `${shippingFee.toLocaleString()} đ`);
  drawSummaryRow("Tổng cộng", `${finalTotal.toLocaleString()} đ`, true);

  // Footer
  ctx.fillStyle = "#111827";
  ctx.font = "bold 18px Arial";
  y += 10;

  ctx.font = "12px Arial";
  ctx.fillStyle = "#6b7280";
  ctx.fillText("Ghi chú:", padding, y);
  ctx.fillText("1. Đơn giá trên chưa bao gồm thuế VAT.", padding, y + 16);
  ctx.fillText("2. Bảng báo giá này có hiệu lực trong vòng 15 ngày kể từ ngày báo giá.", padding, y + 32);
  ctx.fillText("3. Vật tư sẽ được lập mẫu kiểm tra trước khi sản xuất.", padding, y + 48);
  ctx.fillText("4. Đơn giá đã bao gồm công lắp đặt và thi công lắp đặt hoàn chỉnh.", padding, y + 64);
  ctx.fillText("5. Hết thời gian, nếu không thông báo thì sẽ không được giữ lại đơn hàng.", padding, y + 80);
  ctx.fillText("6. Mọi ý kiến xin liên hệ Mr Vương Trần 0981 250725.", padding, y + 96);
  ctx.fillText("Cảm ơn sự hợp tác của Quý Công ty. Trân trọng.", padding, y + 112);

  // Export with adjusted filename
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so +1
  const date = String(now.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${date}`;

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

    const proxyUrl = `/api/proxy-image?url=${encodeURIComponent(src)}`;
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = proxyUrl;
  });
};

// Helper function to wrap text
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