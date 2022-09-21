#include <iostream>
#include <fstream>
#include <cmath>
#include <math.h>
#include <ctime>
#include <Windows.h>

#include <stdio.h> 
#include <time.h> 
#include <vector>
#include <string>


int main() {
	const std::string inFile("Input_File.txt");
	const std::string outFile("Output_File.txt");
	system("color F0");

	std::vector<int> vec;
	std::vector<
	int err;
	GetTest(vec);
	WriteTest(inFile, vec);
	RunTest();
	getTestResult(outFile)
	return 0;
}