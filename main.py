n = 4
queens = 0
def createBoard(n):
    board = [0] * n**2
    return board
def drawQueen(f, c, board):
    if(board[f+c*n] == 0):
        board[f+c*n] = 1
        # horizontal
        for i in range(n):
            if(i!=c):
                board[f+i*n] = 2
        # vertical
        for i in range(n):
            if(i!=f):
                board[i+c*n] = 2
        # diagonal
        af=f
        ac=c
        while(af>0 and ac >0):
            af -= 1
            ac -= 1
            board[af+ac*n]=2
        af=f
        ac=c
        while(af<n-1 and ac<n-1):
            af += 1
            ac += 1
            board[af+ac*n]=2
      # Antidiagonal
        af=f;ac=c;
        while(af<n-1 and ac > 0):
            af+=1
            ac-=1
            board[af+ac*n] = 2
        af=f
        ac=c
        while(af>0 and ac <n-1):
            af-=1
            ac+=1
            board[af+ac*n] = 2
def printBoard(board):
    res = ""
    for i in range(n):
        for j in range(n):
            res += str(board[i+j*n])
            if (j < n-1):
                res += ", "
        res += "\n"
    print(res)
def main():
    # cpboard.extend(board)
    board = createBoard(n)

    printBoard(board)
main()
