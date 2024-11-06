FROM python:3.10.14-slim

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip install --upgrade pip

RUN apt-get update && apt-get install -y wget && \
    wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh -O miniconda.sh && \
    bash miniconda.sh -b -p /opt/conda && \
    rm miniconda.sh && \
    /opt/conda/bin/conda init && \
    /opt/conda/bin/conda config --set always_yes yes && \
    /opt/conda/bin/conda update -n base -c defaults conda

RUN /opt/conda/bin/conda install -c conda-forge cudatoolkit=11.7 cudnn=8.1.0

RUN pip install "tensorflow<2.11" && \
    pip install --no-cache-dir -r requirements.txt && \
    pip install xgboost
        

RUN pip install --upgrade scikit-image

RUN pip install keras==2.10

COPY . .

EXPOSE 5000

CMD ["python", "server.py"]
