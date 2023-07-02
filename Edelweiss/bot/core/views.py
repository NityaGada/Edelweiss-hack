from django.shortcuts import render
import subprocess


def front(request):
    context = {"a": 1}
    return render(request, "index.html", context)


def options_chain(request):
    import socket
    import re
    import struct
    from datetime import datetime
    from py_vollib.black_scholes_merton import black_scholes_merton
    from py_vollib.black_scholes.implied_volatility import implied_volatility
    from py_lets_be_rational.exceptions import BelowIntrinsicException
    from py_lets_be_rational.exceptions import AboveMaximumException

    host = 'localhost'
    port = 9011
    buffer_size = 1024

    client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    client_socket.connect((host, port))

    client_socket.send(b'\x01')

    packet_size = 130
    buffer = b''
    data1 = []
    # tradingsymbol = []
    # sequencenumber = []
    # ts = []
    # ltpp = []
    # ltpq = []
    # v = []
    # bidprice = []
    # bidquant = []
    # askp = []
    # askq = []
    # openinterest = []
    # prevcloseprice = []

    while True:

        data = client_socket.recv(buffer_size)
        if not data:
            break

        buffer += data

        while len(buffer) >= packet_size:
            packet_data = buffer[:packet_size]
            buffer = buffer[packet_size:]

            unpacked_data = struct.unpack('<i30sqqqqqqqqqqqq', packet_data)

            packet_length = unpacked_data[0]
            trading_symbol = (
                unpacked_data[1].decode().rstrip(
                    '\x00') if len(unpacked_data) > 1 else None
            )

            sequence_number = unpacked_data[2] if len(
                unpacked_data) > 2 else None
            timestamp = (
                unpacked_data[3] if len(unpacked_data) > 3 else None
            )
            timestampp = datetime.fromtimestamp(timestamp // 1000)
            formatted_datetime = timestampp.strftime("%Y-%m-%d %H:%M:%S")
            ltp = unpacked_data[4] / 100 if len(unpacked_data) > 4 else None
            ltp_quantity = unpacked_data[5] if len(unpacked_data) > 5 else None
            volume = unpacked_data[6] if len(unpacked_data) > 6 else None
            bid_price = unpacked_data[7] / \
                100 if len(unpacked_data) > 7 else None
            bid_quantity = unpacked_data[8] if len(unpacked_data) > 8 else None
            ask_price = unpacked_data[9] / \
                100 if len(unpacked_data) > 9 else None
            ask_quantity = unpacked_data[10] if len(
                unpacked_data) > 10 else None
            open_interest = unpacked_data[11] if len(
                unpacked_data) > 11 else None
            prev_close_price = unpacked_data[12] / \
                100 if len(unpacked_data) > 12 else None
            previous_open_interest = unpacked_data[13] if len(
                unpacked_data) > 11 else None
            # iv calculation
            cp = trading_symbol[len(trading_symbol)-2:]
            #price = ((bid_price) + (ask_price))/2
            matches = re.findall(
                r"([A-Z]+)|(\d{2}[A-Z]{3}\d+)|(\d+)|([A-Z]+)", trading_symbol)
            result = [match[0] or match[1] or match[2] or match[3]
                      for match in matches]
            t = 0
            iv = ""
            if cp == 'XX':
                iv = '-'
            elif cp == "":
                iv = '-'
            else:

                k = result[1][7:]
                tt = result[1][0:7] + " 15:30:00"
                tt = datetime.strptime(tt, "%d%b%y %H:%M:%S")
                t = (tt - timestampp).days/365.25
                r = 0.05
                q = 0.0
                flag = cp[0].lower()
                dic = {'ALLBANKS': 43790.20, 'FINANCIALS': 19322.70,
                       'MAINIDX': 18487.75, 'MIDCAPS': 7592.05}

                # print(ltp,  float(k),dic[result[0]], t, r, flag)
                try:
                    iv = str(round(implied_volatility(
                        ltp, dic[result[0]], float(k), t, r, flag)*100, 2))+"%"
                except (BelowIntrinsicException, AboveMaximumException):
                    iv = '-'

            change_interest = round(open_interest-previous_open_interest, 2)
            change = round(ltp - prev_close_price, 2)

            ss = []
            ss.append(tt)
            ss.append(volume)
            ss.append(open_interest)
            ss.append(change_interest)
            ss.append(ltp)
            ss.append(iv)
            ss.append(change)
            ss.append(bid_quantity)
            ss.append(bid_price)
            ss.append(ask_price)
            ss.append(ask_quantity)
            ss.append(k)
            ss.append(cp)
            ss.append(timestampp)

            data1.append(ss)
            if len(data1) >= 50:
                # data.append(tradingsymbol)
                # data.append(sequencenumber)
                # data.append(ts)
                # data.append(ltpp)
                # data.append(ltpq)
                # data.append(v)
                # data.append(bidprice)
                # data.append(bidquant)
                # data.append(askp)
                # data.append(askq)
                # data.append(openinterest)
                # data.append(prevcloseprice)
                return render(request, 'options_chain.html', {'data': data1})

    return render(request, 'options_chain.html', {'data': data, })
