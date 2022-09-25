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
#include <algorithm>
#include <string_view>
#include <sstream>

std::ostream& operator<<(std::ostream& stream, const std::vector<int>& vec) {
	if (vec.size() == 0) {
		return stream;
	}

	for (size_t i = 0; i < vec.size() - 1; i++) {
		stream << vec.at(i) << ' ';
	}
	return (stream << vec.at(vec.size() - 1));
}

bool getVector(const std::string& data, std::vector<int>& vec) {
	std::stringstream tempStream(data);

	int num = 0;

	while (tempStream >> num) {
		vec.push_back(num);
		if (tempStream.fail()) {
			return false;
		}
	}
	return true;
}

bool badFstream(std::ifstream& stream) {
	return !stream || stream.peek() == EOF;
}

void writeTest(const std::string_view file, const std::vector<int>& vec) {
	std::ofstream output(file.data());
	output << vec;
}

bool getVectorFromFile(const std::string_view file, std::vector<int>& vec, int& errCode) {
	std::ifstream input(file.data());
	if (badFstream(input)) {
		errCode = 0;
		return false;
	}
	std::string temp;
	std::getline(input, temp);

	if (!getVector(temp, vec)) {
		errCode = 1;
		return false;
	}

	return true;
}


int main() {
	const std::string inFile("Input_File.txt");
	const std::string outFile("Output_File.txt");
	const std::string testFile("Test_File.txt");
	const std::string exeName("TRPO1.exe");
	system("color F0");

	std::vector<int> vec;
	std::vector<int> sorted;

	std::ifstream testStream(testFile.data());
	if (badFstream(testStream)) {
		std::cout << "ERROR: Could not open file " << testFile << " or it is empty" << std::endl;
		system("pause");
		return 0;
	}
	std::string line;
	int count = 0;

	while (!testStream.eof()) {
		std::getline(testStream, line);
		//std::cout << line;
		count++;
		int errCode = -1;
		if (!getVector(line, vec)) {
			std::cout << "ERROR: failed to get a test vector "
				<< count << ": incorrect character detected." << std::endl;
			continue;
		}

		writeTest(inFile, vec);
		system(exeName.data());

		Sleep(100);
		if (!getVectorFromFile(outFile, sorted, errCode)) {
			std::cout << "ERROR: ";
			switch (errCode) {
			case 0:
				std::cout << "Could not open file " << outFile << " or it is empty";
				break;
			case 1:
				std::cout << "detected incorrect character while reading trpo1.exe's output";
				break;
			default:
				std::cout << "unpredicted error";
				break;
			}
			std::cout << std::endl;
		}

		std::sort(vec.begin(), vec.end());
		const bool testPassed = std::equal(vec.begin(), vec.end(), sorted.begin(), sorted.end());

		std::cout << "Test " << count << ": ";
		if (testPassed) {
			std::cout << "PASSED:\n\t expected array: " << vec << "\n\t got array: " << sorted << std::endl;
			std::cout << "\n";
		}
		else {
			std::cout << "FAILED: \n\t expected array: " << vec << "\n\t got array: " << sorted << std::endl;
			std::cout << "\n";
		}

		//line.clear();

		vec.clear();
		sorted.clear();
	}

	system("pause");
	return 0;
}