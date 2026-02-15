---
title: smallQR
subtitle: All you need is a small QR code
slug: smallqr
date: 2023-12-20
img: "../images/blogs/wien.jpg"
category: "Projects"
---

<table>
  <tr>
    <td><H2>smallQR</H2></td>
    <td><a  class="btn btn-primary m-3" href="https://smallqr.pythonanywhere.com/" target="_blank" rel="noopener">open app</a></td>
  </tr>
</table>

The QR code is a 2D barcode that can contain up to 7089 digits or 4296 characters.
A traditional QR code is composed by a matrix of black and white squares, that can be read by a camera and decoded by a software.

Information can be encoded in a QR code in different ways, and the most common is the alphanumeric one.

A traditional use case for research is to include a QR code in a poster or presentation, so that the audience can scan it and get more information about the topic.

The problem is that the QR code is usually too big to be included in a poster, and its resolution is too low to be scanned from a distance.

![img](https://raw.githubusercontent.com/vignif/smallQR/main/main.png)

The solution is to encode whatever information we want in a small QR code, and then use a software to enlarge it.

QR codes have a built-in error correction, so that even if the code is partially damaged, it can still be decoded.
The use case described here (a qr code on a poster) does not usually require a high error correction, so we can use a small QR code with a low error correction.

This small project uses a python library and is deployed on pythonanywhere via a flask wrapper.
