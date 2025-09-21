d3.csv("data.csv").then(data => {
    data.forEach(d => {
        d["Thành tiền"] = +d["Thành tiền"];
        d["Mã Nhóm hàng"] = d["Mã Nhóm hàng"].trim(); // loại bỏ khoảng trắng thừa
    });

    const groups = [...new Set(data.map(d => d["Mã Nhóm hàng"]))];

    // Tạo thang màu cho nhóm hàng
    const color = d3.scaleOrdinal()
        .domain(groups)
        .range(d3.schemeCategory10);

    // Vẽ thanh
    svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("y", d => y(`[${d["Mã mặt hàng"]}] ${d["Tên mặt hàng"]}`))
        .attr("height", y.bandwidth())
        .attr("x", 0)
        .attr("width", d => x(d["Thành tiền"]))
        .attr("fill", d => color(d["Mã Nhóm hàng"]));

    // Legend
    const legend = svg.append("g")
        .attr("transform", `translate(${width - 150}, 0)`);

    legend.selectAll("rect")
        .data(groups)
        .enter()
        .append("rect")
        .attr("x", 0)
        .attr("y", (d, i) => i * 20)
        .attr("width", 15)
        .attr("height", 15)
        .attr("fill", d => color(d));

    legend.selectAll("text")
        .data(groups)
        .enter()
        .append("text")
        .attr("x", 25)
        .attr("y", (d, i) => i * 20 + 12)
        .text(d => d)
        .style("font-size", "12px")
        .attr("alignment-baseline", "middle");
});