---
title: C语言中的数组与指针
published: 2026-03-06
description: "尝试一次性理解C语言中的数组与指针的那些折磨人的问题。"
image: "assets/image.png"
tags: ["C"]
category: Note
draft: false
---

>[!NOTE]
>Image by <a href="https://pixabay.com/users/andsproject-26081561/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=8435339">ANDRI TEGAR MAHARDIKA</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=8435339">Pixabay</a>
>
## 写在前面

前天一天速通了C语言，基础不免薄弱，C++的指针我都没怎么清楚，现在得研究C语言的指针。无他，考研要考，平时基本上用不到，当个题来练。

这个视频我不是很懂，大概是没开声音听的：<https://www.bilibili.com/video/BV1kV4y1C7z6/?p=7>

本文仅为个人学习记录，初学，未免错误之处。

---

## 数组与指针

### 数组

数组是一块连续的内存空间，可以存储相同类型的数据。

```c
#include <stdio.h>

int main()
{
    int arr[10];                 // 声明一个长度为10的整型数组
    char str[10] = "1234567890"; // 声明一个长度为10的字符数组
    float farr[3][4] = {
        {1.1, 2.2, 3.3, 4.4},
        {5.5, 6.6, 7.7, 8.8},
        {9.9, 10.1, 11.1, 12.1}}; // 声明一个3行4列的浮点型二维数组

    arr[0] = 1; // 给数组的第一个元素赋值

    printf("arr[0] = %d\n", arr[0]); // 输出数组的第一个元素的值

    printf("str = %c\n", str[9]); // 输出字符数组的最后一个元素的值

    for (int i = 0; i < 3; i++)
    {
        for (int j = 0; j < 4; j++)
        {
            printf("%.1f ", farr[i][j]); // 输出二维数组的元素
        }
        printf("\n");
    }
}
```

<details>
<summary>输出</summary>

```cmd
arr[0] = 1
str = 0
1.1 2.2 3.3 4.4
5.5 6.6 7.7 8.8
9.9 10.1 11.1 12.1
```

</details>

### 指针

指针是一种特殊的变量，它指向内存中的某个位置，可以用来存取内存中的值。

```c

#include <stdio.h>

int main()
{
    int a = 10;
    int *p = &a;
    printf("Address of a: %p\n", &a);
    printf("Value of a: %d\n", a);
    printf("Address of p: %p\n", p);
    printf("Value of p: %d\n", *p);
    &a == p ? printf("&a == p\n") : printf("&a != p\n");
    *p = 20; // 操作指针修改变量的值
    printf("value of a after changing: %d\n", a);
    return 0;
}
```

<details>
<summary>输出</summary>

```cmd
Address of a: 00000086029ff894
Value of a: 10
Address of p: 00000086029ff894
Value of p: 10
&a == p
value of a after changing: 20
```

</details>

### 一维数组与指针

可以用指针操作一维数组中的元素。

这里没有用到`&`，可以把指针看作数组，二者等价。

```c
#include <stdio.h>

int main()
{
    int arr[5] = {1, 2, 3, 4, 5}; // 一维数组
    int *ptr = arr;
    ptr == arr ? printf("ptr == arr\n") : printf("ptr != arr\n"); // 比较的是地址
    printf("arr[0] = %d\n", *ptr);                                // 输出第一个元素
    ptr++;
    printf("arr[1] = %d\n", *ptr); // 输出第二个元素
    // -----
    printf("arr[0] = %d\n", *arr);       // 输出第一个元素
    printf("arr[4] = %d\n", *(arr + 4)); // 输出最后一个元素

    printf("address of arr = %p\n", arr);
    printf("address of ptr = %p\n", ptr);
    // 这里的ptr+1是地址，不是元素值，且本次输出的值比上次输出的值大4个字节（int）
    printf("address of ptr+1 = %p\n", ptr + 1);

    // 更改第3个元素的值
    arr[2] = 30;
    printf("arr[2] = %d\n", arr[2]); // 输出第3个元素
    *(arr + 2) = 100;
    printf("arr[2] = %d\n", *(arr + 2)); // 输出第3个元素
    *(ptr + 2) = 999;
    printf("arr[2] = %d\n", *(ptr + 2)); // 输出第3个元素
    printf("arr[2] = %d\n", ptr[2]);     // 输出第3个元素
    return 0;
}
```

<details>
<summary>输出</summary>

```cmd
ptr == arr
arr[0] = 1
arr[1] = 2
arr[0] = 1
arr[4] = 5
address of arr = 0000002538dff830
address of ptr = 0000002538dff834
address of ptr+1 = 0000002538dff838
arr[2] = 30
arr[2] = 100
arr[2] = 999
arr[2] = 999
```

</details>

### 二维数组与指针

二维数组本质上是一维数组的数组，所有指针操作都可以从一维数组的角度推导。

```c
#include <stdio.h>

int main()
{
    // 指针数组，包含5个元素，每个元素都是指向int的指针。
    int *a[5];
    /*
    a 是一个指针数组，包含 5 个元素，每个元素都是一个指向 int 的指针。
    在代码中，并没有为这些指针分配具体的内存或赋值，
    因此它们的初始值是未定义的，通常是**随机**的。
    */
    printf("%p, %d, %d\n", a, a, *a);
    printf("%d\n", *(a + 2)); // 输出数组的第三个元素
    for (int i = 0; i < sizeof(a) / sizeof(a[0]); i++)
    {
        printf("a[%d] = %d\n", i, *(a + i));
    }
    // 数组指针，b是一个指针，指向一个包含5个int的数组。
    int arr[5] = {1, 2, 3, 4, 5}; // 看作一个变量a
    int (*b)[5];                  // 看作一个指针变量t=&a
    b = &arr;

    // 正确输出指针 b 和数组元素
    printf("指针 b 的地址: %p\n", (void *)&b);
    /*
    printf 函数在处理指针时需要明确知道指针的类型。对于指针参数，printf 使用 %p 格式说明符来打印指针的值。
    为了确保 printf 能够正确处理指针，通常需要将其转换为 void * 类型。
    这是因为 %p 是为 void * 类型设计的，这样可以避免平台特定的格式问题。
    */
    printf("指针 b 指向的数组地址: %p\n", (void *)b);
    printf("数组的第一个元素: %d\n", (*b)[0]);
    printf("数组的第二个元素: %d\n", (*b)[1]);
    // 增加 b 后的行为
    b++;
    printf("增加后的指针 b 的地址: %p\n", (void *)&b);
    printf("增加后的指针 b 指向的数组地址: %p\n", (void *)b);
    // 注意：这里 b 指向的数组地址已经无效，因此不能直接访问数组元素
    return 0;
}
```

<details>
<summary>输出</summary>

```cmd
00000077ee3ffb00, -297796864, 0
1109861320
a[0] = 0
a[1] = -1940712215
a[2] = 1109861320
a[3] = 57
a[4] = 1109861216
指针 b 的地址: 00000077ee3ffad8
指针 b 指向的数组地址: 00000077ee3ffae0
数组的第一个元素: 1
数组的第二个元素: 2
增加后的指针 b 的地址: 00000077ee3ffad8
增加后的指针 b 指向的数组地址: 00000077ee3ffaf4
```

</details>

---

二维数组名 a 在表达式中被视为指向第一行的指针（行指针）。

行指针 p 指向一整行，p[i] 得到该行的首列指针（列指针）。

任何二维数组元素都可以通过 ((p+i)+j) 或 p[i][j] 访问。

理解的关键：分清“行指针”和“列指针”，以及它们之间的转换关系。

```c
#include <stdio.h>

int main()
{
    int a[5][5];
    int (*p)[5] = a;
    p == &a[0] ? printf("p is a[0]\n") : printf("p is not a[0]\n");
    *p == &a[0][0] ? printf("*p is a[0][0]\n") : printf("*p is not a[0][0]\n");
    *(p + 1) + 2 == &a[1][2] ? printf("*(p+1)+2 is a[1][2]\n") : printf("*(p+1)+2 is not a[1][2]\n");
    *(*(p + 4) + 4) == a[4][4] ? printf("*(*(p+4)+4) is a[4][4]\n") : printf("*(*(p+4)+4) is not a[4][4]\n");
    p + 2 == &a[2] ? printf("p+2 is a[2]\n") : printf("p+2 is not a[2]\n");
    *(p + 2) == &a[2][0] ? printf("*(p+2) is a[2][0]\n") : printf("*(p+2) is not a[2][0]\n");
}
```

<details>
<summary>输出</summary>

```cmd
p is a[0]
*p is a[0][0]
*(p+1)+2 is a[1][2]
*(*(p+4)+4) is a[4][4]
p+2 is a[2]
*(p+2) is a[2][0]
```

</details>
