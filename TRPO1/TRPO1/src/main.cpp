#include <iostream>
#include <fstream>
#include <cmath>
#include <math.h>
#include <ctime>
#include <Windows.h>

#include <stdio.h> 
#include <time.h> 
#include <vector>

//using namespace std;

//���� � �������� �������
const std::string Input_FName("Input_File.txt");	//���� � �������� ��� ����������

//���� � ��������� �������
const std::string Output_FName("Output_File.txt");

//������� ���������� ������� �� �����
void Get_Array(const std::string_view Input_FName, std::vector<int>& array, int& Err_Code) {
	
	std::ifstream fin(Input_FName.data());
	int test_numb = 0;
	//���� �� ������
	if (!fin)
	{
		Err_Code = 1;
		return;
	}//if

	if (fin.peek() == EOF) //���� ����
	{
		Err_Code = 2;
		return;
	}//if

	fin >> test_numb;
	if (fin.fail())  //� ����� �� �����
	{
		Err_Code = 3;
		return;
	}

	array.push_back(test_numb);

	while (!fin.eof()) //���� ���� �� ��������
	{	
		fin >> test_numb;
		array.push_back(test_numb);
	}//while

}//Get_Array()

//������� ���������� ���������
void Bubble_Sort(std::vector<int>& array) {


}

//������� ������ ������� � ����
void Print_Array(const std::string_view Output_FName, std::vector<int>& array) {


}


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