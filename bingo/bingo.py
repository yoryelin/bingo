import random

class Bingo:
    def __init__(self, max_num=75):
        self.max_num = max_num
        self.numeros_usados = []


    def generar_numero_bingo(self):
        if len(self.numeros_usados) >= self.max_num + 1:
            raise ValueError(
                "Todos los números posibles ya han sido generados.")


        numero = random.randint(1, self.max_num)
        while numero in self.numeros_usados:
            numero = random.randint(1, self.max_num)
        self.numeros_usados.append(numero)
        return numero


    def mostrar_numeros_generados(self):
        print("Números generados hasta ahora:")
        for i in range(0, len(self.numeros_usados), 10):
            print(", ".join(map(str, self.numeros_usados[i:i+10])))


def main():
    bingo = Bingo()


    while True:
        try:
            input("Presiona Enter para mostrar el próximo número de bingo...")
            numero = bingo.generar_numero_bingo()
            print(f"Número del bingo: {numero}")
            bingo.mostrar_numeros_generados()
        except ValueError as e:
            print(e)
            break


if __name__ == "__main__":
    main()


