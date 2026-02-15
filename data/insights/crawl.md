---
title: Scholar Crawling
subtitle: Look, Ma, No Hands!
slug: roots
date: 2023-04-27
img: "../images/blogs/bot.png"
---

## Exploring Web Scraping for Researcher Statistics: A Google Scholar Adventure

[ProjectRepo](https://github.com/francescovigni/crawler-google-scholar)

In the ever-evolving landscape of data retrieval, I embarked on a journey to explore the nuances of web scraping for obtaining statistics of researchers or professors from Google Scholar. While existing solutions like [scholarly](https://pypi.org/project/scholarly/) offer a structured approach, I was intrigued by the intricacies of HTTP requests and the implications of crawling the web efficiently.

### Project Overview

The project aims to automatically download statistics for a set of researchers given their [name surname] pairs. The primary focus is on extracting key information such as the number of publications, h-index, i10-index, and more from Google Scholar.

### Methodology

To understand the impact of web crawling, I implemented different scripts, each employing a unique approach:

1. **get_stats_serial.py:**

   - Waits for each task to complete before moving on to the next researcher.
   - Time complexity: O(N), suitable for a smaller number of researchers.

2. **get_stats_coroutine.py:**
   - Doesn't wait for a task to complete and requests the next one right away.
   - Utilizes coroutines to enable parallel execution.
   - Requires careful timing to avoid server rejection (Error 429 Too Many Requests).

### Performance Comparison

- **get_stats_serial.py:**

  - Downloaded info per second: 0.7

- **get_stats_coroutine.py:**
  - Downloaded info per second: 0.05

### Usage

1. Input information in an .xlsx file with two columns [surname, name].
2. Run `get_stats_coroutine.py` to generate `stats.txt`.

Additionally, `get_picts.py` is recommended for downloading profile images.

### Implementation Considerations

Web scraping is inherently time-consuming, and servers impose request limits. To mitigate this, it's crucial to implement proper timing within each script to prevent server rejection.

### Conclusion

This project not only delves into the technical aspects of HTTP requests and web scraping but also provides practical insights into optimizing data retrieval from Google Scholar. The presented scripts offer flexibility in handling different scenarios, providing a valuable resource for researchers, academics, or anyone interested in exploring the world of web scraping.
