#include <fstream>
#include <iostream>
#include <string>
#include "dirent.h"
using namespace std;

void processLine(wchar_t* line, wofstream &out)
{
	locale::global(locale("")); // https://stackoverflow.com/a/3950795/1060631 (might be different for Windows)
	wstring wline(line);
	out << wline << endl;
	out << wline.size() << endl;
	for(wstring::iterator it=wline.begin(); it!=wline.end(); it++)
		out << *it << endl;
}

bool readfile(char* filename, string path)
{
	if(strcmp(filename, ".") == 0)
		return false;
	if(strcmp(filename, "..") == 0)
		return false;

	string fn(filename);
	fn = path + "/" + fn;

	wchar_t line[1000];
	wifstream in;
	wofstream out; // https://stackoverflow.com/a/18226387/1060631
	in.open(fn, wifstream::in);
	out.open("out.txt", wofstream::out | wofstream::binary | wofstream::trunc);

	if(!in.is_open()) {
		perror("Could not open infile");
		return false;
	}
	if(!out.is_open()) {
		perror("Could not open outfile");
		return false;
	}

	while(in.getline(line, 1000)) {
		processLine(line, out);
	}

	in.close();
	out.close();

	return true;
}

int readfiles()
{
	DIR *dir;
	struct dirent *ent;
	string path = "./files";
	dir = opendir(path.c_str());
	if(dir != NULL) {
		ent = readdir(dir);
		while (ent != NULL) {
			readfile(ent->d_name, path);
			ent = readdir(dir);
		}
		closedir(dir);
	} else {
		perror("Could not open directory");
		return EXIT_FAILURE;
	}
	return 0;
}

int main()
{
	readfiles();
	return 0;
}
