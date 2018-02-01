#include <fstream>
#include <iostream>
#include <string>
#include <map>
#include "dirent.h"
using namespace std;

void processLine(wchar_t* line, map<wstring, int> &words)
{
	// TODO
	wstring wline(line);
	words[wline] = 1;
}

bool readfile(char* filename, string path, map<wstring, int> &words)
{
	if(strcmp(filename, ".") == 0)
		return false;
	if(strcmp(filename, "..") == 0)
		return false;
	string fn(filename);
	fn = path + "/" + fn;

	// Setup input
	int lineSize = 1000;
	wchar_t line[lineSize]; // char array to hold lines as they are read from file
	wifstream in;
	in.open(fn, wifstream::in);
	if(!in.is_open()) {
		perror("Could not open infile");
		return false;
	}

	// Read in one line at a time
	while(in.getline(line, lineSize)) {
		processLine(line, words);
	}
	in.close();

	return true;
}

int readfiles()
{
	// Set up map structure to contain words and word counts
	map<wstring, int> words;

	// Read each file in a directory
	DIR *dir; // https://stackoverflow.com/a/612176/1060631
	struct dirent *ent;
	string path = "./files"; // Path to directory to read files from
	dir = opendir(path.c_str());
	if(dir != NULL) {
		ent = readdir(dir); // Read entity from directory
		while (ent != NULL) {
			readfile(ent->d_name, path, words); // Read each file in directory
			ent = readdir(dir);
		}
		closedir(dir);
	} else {
		perror("Could not open directory");
		return EXIT_FAILURE;
	}

	// Output
	locale::global(locale("")); // https://stackoverflow.com/a/3950795/1060631 (might be different for Windows)
	wofstream out; // https://stackoverflow.com/a/18226387/1060631
	out.open("out.txt", wofstream::out | wofstream::binary | wofstream::trunc);
	if(!out.is_open()) {
		perror("Could not open outfile");
		return false;
	}
	for(map<wstring,int>::iterator it = words.begin(); it != words.end(); it++)
	{
		wstring word = it->first;
		out << word << endl;
	}
	out.close();

	return 0;
}

int main()
{
	readfiles();
	return 0;
}
