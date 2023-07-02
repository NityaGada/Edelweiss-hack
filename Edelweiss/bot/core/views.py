from django.shortcuts import render
import subprocess


def front(request):
    context = {"a": 1}
    return render(request, "index.html", context)


def options_chain(request):
    import socket
    import struct
    from datetime import datetime

    # Set up the TCP/IP connection
    host = 'localhost'  # Assuming the server is running on the same machine
    port = 9011
    buffer_size = 1024  # Adjust the buffer size as needed

    # Connect to the server
    client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    client_socket.connect((host, port))

    # Send the initial request indicating readiness
    client_socket.send(b'\x01')

    # Receive and display the data
    packet_size = 130  # Packet size is fixed at 106 bytes
    buffer = b''  # Buffer to accumulate received data
    data = []
    tradingsymbol = []
    sequencenumber = []
    ts = []
    ltpp = []
    ltpq = []
    v = []
    bidprice = []
    bidquant = []
    askp = []
    askq = []
    openinterest = []
    prevcloseprice = []

    while True:
        data = client_socket.recv(buffer_size)
        if not data:
            break

        buffer += data

        # Process complete packets in the buffer
        while len(buffer) >= packet_size:
            packet_data = buffer[:packet_size]
            buffer = buffer[packet_size:]

            # Unpack the fields from the received data
            unpacked_data = struct.unpack('<i30sqqqqqqqqqqqq', packet_data)

            # Process the unpacked data
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
            formatted_datetime = timestampp.strftime("%Y-%m-%d %H:%M")
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

            data = []
            # Process and display the packet data as needed

            tradingsymbol.append(trading_symbol)
            sequencenumber.append(sequence_number)
            ts.append(formatted_datetime)
            ltpp.append(ltp)
            ltpq.append(ltp_quantity)
            v.append(volume)
            bidprice.append(bid_price)
            bidquant.append(bid_quantity)
            askp.append(ask_price)
            askq.append(ask_quantity)
            openinterest.append(open_interest)
            prevcloseprice.append(prev_close_price)

            if len(tradingsymbol) >= 50:
                data.append(tradingsymbol)
                data.append(sequencenumber)
                data.append(ts)
                data.append(ltpp)
                data.append(ltpq)
                data.append(v)
                data.append(bidprice)
                data.append(bidquant)
                data.append(askp)
                data.append(askq)
                data.append(openinterest)
                data.append(prevcloseprice)
                return render(request, 'options_chain.html', {'data': data})

    return render(request, 'options_chain.html', {'data': data})
