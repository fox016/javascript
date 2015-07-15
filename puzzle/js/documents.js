function DocumentHandler() {

        this.documents = [];

        this.init = function(downloadUrl, uploadUrl)
        {
                $('body').append("<form style='display:none' id='downloadForm' name='downloadForm' method='POST' action='" + downloadUrl + "'><input type='hidden' id='FILE_ID' name='FILE_ID' value=''><input type='hidden' id='FILENAME' name='FILENAME' value=''></form>");
                $('body').append("<form style='display:none' id='fileForm' name='fileForm'><input type='file' id='fileSelect' name='fileSelect'></form>");
                this.uploadUrl = uploadUrl;
        }

        this.download = function(document_id, filename)
        {
                if(!document_id || !filename)
                        return;
                document.downloadForm.FILE_ID.value=document_id;
                document.downloadForm.FILENAME.value=filename;
                document.downloadForm.submit();
        }

        this.addDocument = function(filename, document_id, file_object, created_date_time)
        {
                this.documents.push({filename: filename, document_id: document_id, file_object: file_object, created_date_time: created_date_time});
        }

        this.uploadNewDocuments = function(callback)
        {
                var uploadPromises = [];
                for(var i=0; i < this.documents.length; i++) {
                        if(this.documents[i].file_object != null) {
                                uploadPromises.push(this.uploadBinaryFile(i));
                        }
                }

                var documentHandler = this;
                var promiseOfUploads = $.when.apply($, uploadPromises);
                $.when(promiseOfUploads).then(function()
                {
                        for(var i = 0; i <arguments.length; i++) {
                                var data = arguments[i];
                                if(data.id != "") {
                                        documentHandler.documents[data.index].file_object = null;
                                        documentHandler.documents[data.index].document_id = data.id;
                                        documentHandler.documents[data.index].created_date_time = new Date();
                                }
                                else {
                                        alert("Error uploading attachment: " + filename);
                                }
                        }
                        callback();
                });
        }

	this.uploadBinaryFile = function(index)
        {
                var file_object = this.documents[index].file_object;
                var filename = file_object.name;
                filename = filename.replace("&", "and");
                filename = filename.replace("<", "");
                filename = filename.replace(">", "");
                filename = filename.replace("'", "");
                filename = filename.replace("\"", "");
                file_object.name = filename;

                var fileForm = new FormData();
                fileForm.append("file", file_object);
                fileForm.append("index", index);

                var uploadRequest = $.ajax({
                        type: "POST",
                        url: this.uploadUrl,
                        data: fileForm,
                        dataType: "json",
                        processData: false,
                        contentType: false,
                        error: function(xhr, statusText, errorThrown) {
                                alert("Error uploading attachment: " + filename);
                        },
                });

                return uploadRequest.then(function(data, textStatus, xhr) { return data; }); }

        this.selectFile = function()
        {
                document.fileForm.fileSelect.addEventListener('change', handleFileSelect, false);
                document.fileForm.fileSelect.click();
        }

        this.getDocuments = function()
        {
                return this.documents;
        }

        this.removeDocument = function(index)
        {
                if(!(confirm("Are you sure you want to remove " + this.documents[index].filename + "?")))
                        return;

                var removed = this.documents.splice(index, 1);
        }

        this.reset = function()
        {
                this.documents = [];
                $("#fileForm")[0].reset();
                $("#fileForm").trigger('reset');
        }
}

// Array of valid file types for attachments
var validFiletypes = [
        "image/png",
        "image/tiff",
        "image/jpg",
        "image/jpeg",
        "text/plain", 
        "application/pdf", 
        "application/msword", 
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document", 
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", 
        "application/vnd.openxmlformats-officedocument.presentationml.presentation", 
        "application/vnd.ms-excel", 
        "application/vnd.ms-powerpoint", 
        "message/rfc822", 
        "message/partial", 
        "message/external-body" 
];	
