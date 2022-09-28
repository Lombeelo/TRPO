#include <iostream>
#include <fstream>
#include <vector>
#include <string>
#include <string_view>
#include <algorithm>
#include <sstream>

//файл с входными данными
const std::string Input_FName("Input_File.txt");	//файл с массивом для сортировки

//файл с выходными данными
const std::string Output_FName("Output_File.txt");

std::ostream& operator<<(std::ostream& stream, const std::vector<int>& vec) {
    if (vec.size() == 0) {
        return stream;
    }

    for (size_t i = 0; i < vec.size() - 1; i++) {
        stream << vec.at(i) << ' ';
    }
    return (stream << vec.at(vec.size() - 1));
}

//функция считывания массива из файла
void Get_Array(const std::string_view Input_FName, std::vector<int>& array, int& Err_Code) {
    std::ifstream fin(Input_FName.data());
    int test_numb = 0;
    //файл не найден
    if (!fin) {
        Err_Code = 1;
        return;
    }//if

    if (fin.peek() == EOF) //файл пуст
    {
        Err_Code = 2;
        return;
    }//if

    fin >> test_numb;
    if (fin.fail())  //в файле не число
    {
        Err_Code = 3;
        return;
    }

    array.push_back(test_numb);

    while (!fin.eof()) //пока файл не кончился
    {
        fin >> test_numb;
        array.push_back(test_numb);
    }//while

    fin.close();
}//Get_Array()

//функция сортировки пузырьком
void Bubble_Sort(std::vector<int>& array) {
    std::cout << "До сортировки: \n" << array << std::endl;
    for (size_t i = 0; i + 1 < array.size(); i++) {
        for (size_t j = 0; j + 1 < array.size() - i; j++) {
            if (array[j + 1] < array[j]) {
                std::swap(array[j], array[j + 1]);
                std::cout << array << std::endl;
            }//if
        }//for j
    }//for i
    std::cout << "После сортировки: \n" << array << std::endl;
}//Bubble_Sort()

//функция печати массива в файл
void Print_Array(const std::string_view Output_FName, std::vector<int>& array) {
    int i = 0;

    std::ofstream output(Output_FName.data());
    if (array.size() == 0) {
        output.close();
        return;
    }

    output << array << std::endl;
    output.close();
    return;
}//Print_Array()

int main() {
    system("color F0");
    setlocale(LC_ALL, "russian");
    std::vector<int> vec;
    int err;
    Get_Array(Input_FName, vec, err);
    Bubble_Sort(vec);
    Print_Array(Output_FName, vec);
    return 0;
}